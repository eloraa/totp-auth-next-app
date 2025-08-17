import { create, type StateCreator } from 'zustand';

interface Code {
  code: string;
  expires_at: string;
  id: string;
  name: string;
}

interface WebSocketState {
  isConnected: boolean;
  isConnecting: boolean;
  reconnectAttempts: number;
  lastMessage: Code[] | null;
  setConnected: (connected: boolean) => void;
  setConnecting: (connecting: boolean) => void;
  setReconnectAttempts: (attempts: number) => void;
  setLastMessage: (message: Code[] | null) => void;
  reset: () => void;
}

const createWebSocketStore: StateCreator<WebSocketState> = set => ({
  isConnected: false,
  isConnecting: false,
  reconnectAttempts: 0,
  lastMessage: null,
  setConnected: (connected: boolean) => set({ isConnected: connected }),
  setConnecting: (connecting: boolean) => set({ isConnecting: connecting }),
  setReconnectAttempts: (attempts: number) => set({ reconnectAttempts: attempts }),
  setLastMessage: (message: Code[] | null) => set({ lastMessage: message }),
  reset: () => set({ 
    isConnected: false, 
    isConnecting: false, 
    reconnectAttempts: 0, 
    lastMessage: null 
  }),
});

export const useWebSocketStore = create<WebSocketState>()(createWebSocketStore);
