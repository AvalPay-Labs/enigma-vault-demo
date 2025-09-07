import { useMutation } from '@tanstack/react-query'
import { registerUser } from '@/services/converter'
import { saveRegisteredUser } from '@/store/deployments'
import type { RegisterUserResponse } from '@/types/deploy'

export const useRegisterUser = () => {
  return useMutation<RegisterUserResponse, Error, void>({
    mutationKey: ['register-user'],
    mutationFn: async () => {
      const res = await registerUser()
      saveRegisteredUser(res)
      return res
    },
  })
}
