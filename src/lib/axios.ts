import axios from 'axios'
import { BACKEND_CONFIG, withApiVersion } from '@/config/backend'

// Configure axios with backend settings
export const http = axios.create({
  baseURL: BACKEND_CONFIG.baseURL,
  timeout: BACKEND_CONFIG.timeouts.default,
})

// Inject API version into relative URLs beginning with /api when mode=versioned
http.interceptors.request.use((config) => {
  const url = config.url || ''
  if (url.startsWith('/')) {
    config.url = withApiVersion(url)
  }
  return config
})

export type HttpError = Error & { status?: number; code?: string; details?: unknown }

export const toHttpError = (err: any): HttpError => {
  const e: any = new Error(
    err?.response?.data?.message || err?.message || 'Network error',
  )
  e.status = err?.response?.status
  e.code = err?.code
  e.details = err?.response?.data
  return e as HttpError
}
