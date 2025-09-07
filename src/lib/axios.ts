import axios from 'axios'

// Optional base URL for a backend. If not set, service can mock.
const baseURL = import.meta.env.VITE_DEPLOY_SERVICE_URL || ''
const defaultTimeout = Number(import.meta.env.VITE_HTTP_TIMEOUT_MS || 120_000)

export const http = axios.create({
  baseURL,
  timeout: Number.isFinite(defaultTimeout) ? defaultTimeout : 120_000,
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
