import { useQuery } from '@tanstack/react-query'
import { getBalance } from '@/services/converter'

export const useConverterBalance = (walletNumber: number) => {
  return useQuery({
    queryKey: ['converter-balance', walletNumber],
    queryFn: () => getBalance(walletNumber),
    enabled: Number.isFinite(walletNumber),
    staleTime: 15_000,
  })
}

