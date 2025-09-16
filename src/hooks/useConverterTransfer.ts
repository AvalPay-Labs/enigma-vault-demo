import { useMutation } from '@tanstack/react-query'
import { transfer } from '@/services/converter'
import type { ConverterTransferResponse } from '@/types/deploy'

export const useConverterTransfer = () => {
  return useMutation<ConverterTransferResponse, Error, { amount?: number; receiverWalletNumber?: number; receiverWalletAddress?: string } | void>({
    mutationKey: ['converter-transfer'],
    mutationFn: async (payload) => {
      const res = await transfer(payload as any)
      return res
    },
  })
}

