import { http, toHttpError } from '@/lib/axios'

export type LoginPayload = { email: string; password: string }
export type LoginResponse = {
  success: true
  message: string
  data: { user: any; token: string }
  timestamp: string
  executionTime?: number
}

export type ProfileResponse = {
  success: true
  message: string
  data: { user: any }
  timestamp: string
  executionTime?: number
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  if (!http.defaults.baseURL) {
    return {
      success: true,
      message: 'Login exitoso (mock)',
      data: {
        user: { id: 1, email: payload.email, name: 'Mock User', is_auditor: false },
        token: 'mock.jwt.token',
      },
      timestamp: new Date().toISOString(),
    }
  }
  try {
    const timeout = Number((import.meta.env.VITE_LOGIN_TIMEOUT_MS as string | undefined) || 30_000)
    const { data } = await http.post('/api/auth/login', payload, { timeout })
    return data
  } catch (err) {
    throw toHttpError(err)
  }
}

export const getProfile = async (token?: string): Promise<ProfileResponse> => {
  if (!http.defaults.baseURL) {
    return {
      success: true,
      message: 'Perfil obtenido exitosamente (mock)',
      data: { user: { id: 1, email: 'mock@example.com', name: 'Mock User' } },
      timestamp: new Date().toISOString(),
    }
  }
  try {
    const timeout = Number((import.meta.env.VITE_PROFILE_TIMEOUT_MS as string | undefined) || 30_000)
    const headers: Record<string, string> = {}
    if (token) headers['Authorization'] = `Bearer ${token}`
    const { data } = await http.get('/api/auth/profile', { timeout, headers })
    return data
  } catch (err) {
    throw toHttpError(err)
  }
}

