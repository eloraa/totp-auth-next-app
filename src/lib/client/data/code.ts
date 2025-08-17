import { useQuery } from '@tanstack/react-query';
import { getCode } from '@/lib/server/codes/codes';
import { useWebSocketStore } from '@/store/websocket';

export const useCode = (params?: { id?: string; name?: string }) => {
  const { isConnected } = useWebSocketStore();
  
  return useQuery({
    queryKey: ['code', params],
    queryFn: () => getCode(params),
    enabled: !isConnected,
    refetchInterval: isConnected ? false : 30 * 1000, // 30 seconds only when WS is offline
    refetchIntervalInBackground: isConnected ? false : true,
  });
};
