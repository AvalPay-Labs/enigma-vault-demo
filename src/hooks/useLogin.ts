import { useMutation } from '@tanstack/react-query'
import { login, type LoginPayload } from '@/services/auth'

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (payload: LoginPayload) => login(payload),
  })
}

