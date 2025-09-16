import { useQuery } from '@tanstack/react-query'
import { getHealth } from '@/services/info'

export const useHealth = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: getHealth,
    staleTime: 30_000,
  })
}

