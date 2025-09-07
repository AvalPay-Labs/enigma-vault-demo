import { useMutation } from '@tanstack/react-query'
import { deployBasics } from '@/services/converter'
import { saveDeployment } from '@/store/deployments'
import type { DeployBasicsResponse } from '@/types/deploy'

export const useDeployBasics = () => {
  return useMutation<DeployBasicsResponse, Error, Record<string, unknown> | undefined>({
    mutationKey: ['deploy-basics'],
    mutationFn: async (payload) => {
      const res = await deployBasics(payload)
      saveDeployment(res)
      return res
    },
  })
}

