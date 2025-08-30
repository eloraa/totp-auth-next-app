import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useWebSocketStore } from '@/store/websocket';
import { getToken } from '@/lib/server/codes/codes';

interface Code {
  code: string;
  expires_at: string;
  id: string;
  name: string;
}

const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_INTERVAL = 60000;

export const useWebSocket = (params?: { id?: string; name?: string }) => {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const authFailedRef = useRef<boolean>(false);
  const connectRef = useRef<() => Promise<void>>(() => Promise.resolve());
  const disconnectRef = useRef<() => void>(() => {});
  const reconnectRef = useRef<() => void>(() => {});
  const queryClient = useQueryClient();

  const { isConnected, isConnecting, reconnectAttempts, setConnected, setConnecting, setReconnectAttempts, setLastMessage, reset } = useWebSocketStore();

  const connect = async () => {
    if (isConnecting || isConnected) return;

    if (authFailedRef.current) {
      return;
    }

    const wsUrl = process.env.NEXT_PUBLIC_WS_SERVER;
    if (!wsUrl) {
      return;
    }

    setConnecting(true);

    try {
      const ws = new WebSocket(`${wsUrl}/ws`);
      wsRef.current = ws;

      const connectionTimeout = setTimeout(() => {
        if (ws.readyState === WebSocket.CONNECTING) {
          ws.close();
          attemptAuthentication(wsUrl);
        }
      }, 5000);

      ws.onopen = () => {
        clearTimeout(connectionTimeout);
        setConnected(true);
        setConnecting(false);
        setReconnectAttempts(0);

        setupWebSocketHandlers(ws);
      };

      ws.onclose = event => {
        clearTimeout(connectionTimeout);
        if (event.code !== 1000) {
          attemptAuthentication(wsUrl);
        }
      };

      ws.onerror = _ => {
        clearTimeout(connectionTimeout);
        attemptAuthentication(wsUrl);
      };
    } catch (_) {
      setConnecting(false);
      attemptAuthentication(wsUrl);
    }
  };

  // Assign functions to refs
  connectRef.current = connect;

  const setupWebSocketHandlers = (ws: WebSocket) => {
    ws.onmessage = event => {
      try {
        const data: Code[] = JSON.parse(event.data);
        setLastMessage(data);

        queryClient.setQueryData(['code', params], data);

        queryClient.invalidateQueries({ queryKey: ['code'] });
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onclose = event => {
      setConnected(false);
      setConnecting(false);

      if (event.code !== 1000 && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        scheduleReconnect();
      } else if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        console.log('Max reconnection attempts reached');
      }
    };

    ws.onerror = error => {
      console.error('WebSocket error:', error);
      setConnecting(false);
    };
  };

  const attemptAuthentication = async (wsUrl: string) => {
    if (authFailedRef.current) {
      setConnecting(false);
      return;
    }

    try {
      const tokens = await getToken();
      const token = tokens._secure_token?.value || tokens._token?.value;

      if (!token) {
        setConnecting(false);
        return;
      }

      console.log(token);
      
      const baseUrl = wsUrl.replace(/^wss?:\/\//, 'https://');
      const loginUrl = `${baseUrl}/login?token=${encodeURIComponent(token)}`;

      const response = await fetch(loginUrl, { credentials: 'include' });
      const result = await response.json();

      if (result.message !== 'Login successful') {
        setConnecting(false);
        authFailedRef.current = true;
        return;
      }

      const ws = new WebSocket(`${wsUrl}/ws`);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnected(true);
        setConnecting(false);
        setReconnectAttempts(0);

        setupWebSocketHandlers(ws);
      };
    } catch (_) {
      setConnecting(false);
      scheduleReconnect();
    }
  };

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close(1000, 'Manual disconnect');
      wsRef.current = null;
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    reset();
  };

  // Assign functions to refs
  disconnectRef.current = disconnect;

  const scheduleReconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    const nextAttempt = reconnectAttempts + 1;
    setReconnectAttempts(nextAttempt);

    reconnectTimeoutRef.current = setTimeout(() => {
      if (nextAttempt <= MAX_RECONNECT_ATTEMPTS) {
        connect().catch(error => {
          if (error === 'AUTH_FAILED') {
            return;
          }
        });
      }
    }, RECONNECT_INTERVAL);
  };

  const reconnect = () => {
    disconnect();
    setReconnectAttempts(0);
    connect();
  };

  reconnectRef.current = reconnect;

  useEffect(() => {
    connectRef.current?.();

    return () => {
      disconnectRef.current?.();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  return {
    isConnected,
    isConnecting,
    reconnectAttempts,
    connect,
    disconnect,
    reconnect,
  };
};
