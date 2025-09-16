import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/services/auth'

export const useProfile = (token?: string) => {
  return useQuery({
    queryKey: ['profile', !!token],
    queryFn: () => getProfile(token),
    enabled: true,
    staleTime: 30_000,
  })
}

