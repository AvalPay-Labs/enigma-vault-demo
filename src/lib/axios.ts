import axios from 'axios'
import { BACKEND_CONFIG } from '@/config/backend'

// Configure axios with backend settings
export const http = axios.create({
  baseURL: BACKEND_CONFIG.baseURL,
  timeout: BACKEND_CONFIG.timeouts.default,
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
