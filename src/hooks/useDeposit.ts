import { useMutation } from '@tanstack/react-query'
import { deposit } from '@/services/converter'
import { saveDeposit } from '@/store/deployments'
import type { DepositResponse } from '@/types/deploy'

export const useDeposit = () => {
  return useMutation<DepositResponse, Error, void>({
    mutationKey: ['deposit'],
    mutationFn: async () => {
      const res = await deposit()
      saveDeposit(res)
      return res
    },
  })
}

