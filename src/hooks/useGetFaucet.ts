import { useMutation } from '@tanstack/react-query'
import { getFaucet } from '@/services/converter'
import type { GetFaucetResponse } from '@/types/deploy'

export const useGetFaucet = () => {
  return useMutation<GetFaucetResponse, Error, void>({
    mutationKey: ['converter-get-faucet'],
    mutationFn: async () => {
      const res = await getFaucet()
      return res
    },
  })
}

