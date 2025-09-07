import { useMutation } from '@tanstack/react-query'
import { deploySystem } from '@/services/converter'
import { saveSystemDeployment } from '@/store/deployments'
import type { DeploySystemResponse } from '@/types/deploy'

export const useDeploySystem = () => {
  return useMutation<DeploySystemResponse, Error, Record<string, unknown> | undefined>({
    mutationKey: ['deploy-system'],
    mutationFn: async (payload) => {
      const res = await deploySystem(payload)
      saveSystemDeployment(res)
      return res
    },
  })
}

