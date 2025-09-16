import { useMutation } from '@tanstack/react-query'
import { setAuditor } from '@/services/converter'
import type { SetAuditorResponse } from '@/types/deploy'

export const useSetAuditorConverter = () => {
  return useMutation<SetAuditorResponse, Error, void>({
    mutationKey: ['converter-set-auditor'],
    mutationFn: async () => {
      const res = await setAuditor()
      return res
    },
  })
}

