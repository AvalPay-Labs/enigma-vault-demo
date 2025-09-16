import { useQuery } from '@tanstack/react-query'
import { getApiInfo } from '@/services/info'

export const useApiInfo = () => {
  return useQuery({
    queryKey: ['api-info'],
    queryFn: getApiInfo,
    staleTime: 60_000,
  })
}

