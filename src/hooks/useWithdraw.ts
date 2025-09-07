import { useMutation } from '@tanstack/react-query'
import { withdraw } from '@/services/converter'
import { saveWithdraw } from '@/store/deployments'
import type { WithdrawResponse } from '@/types/deploy'

export const useWithdraw = () => {
  return useMutation<WithdrawResponse, Error, void>({
    mutationKey: ['withdraw'],
    mutationFn: async () => {
      const res = await withdraw()
      saveWithdraw(res)
      return res
    },
  })
}

