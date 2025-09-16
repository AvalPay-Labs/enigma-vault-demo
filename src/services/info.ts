import { http, toHttpError } from '@/lib/axios'

export type ApiInfoResponse = {
  name: string
  version: string
  description: string
  endpoints: Record<string, unknown>
}

export type HealthResponse = {
  success: true
  message: string
  timestamp: string
  version?: string
  modules?: string[]
}

export const getHealth = async (): Promise<HealthResponse> => {
  if (!http.defaults.baseURL) {
    return {
      success: true,
      message: 'Backend Enigma funcionando correctamente (mock)',
      timestamp: new Date().toISOString(),
      version: 'mock',
      modules: ['standalone', 'converter'],
    }
  }
  try {
    const timeout = Number((import.meta.env.VITE_HEALTH_TIMEOUT_MS as string | undefined) || 10_000)
    const { data } = await http.get('/api/health', { timeout })
    return data
  } catch (err) {
    throw toHttpError(err)
  }
}

export const getApiInfo = async (): Promise<ApiInfoResponse> => {
  if (!http.defaults.baseURL) {
    return {
      name: 'Backend Enigma API (mock)',
      version: 'mock',
      description: 'API para el sistema de tokens encriptados standalone y converter',
      endpoints: {},
    }
  }
  try {
    const timeout = Number((import.meta.env.VITE_INFO_TIMEOUT_MS as string | undefined) || 10_000)
    const { data } = await http.get('/api', { timeout })
    return data
  } catch (err) {
    throw toHttpError(err)
  }
}

