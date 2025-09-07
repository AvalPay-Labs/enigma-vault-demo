import { http, toHttpError } from '@/lib/axios'
import {
  DeployBasicsResponse,
  DeployBasicsResponseSchema,
  DeploymentBasics,
  DeploySystemResponse,
  DeploySystemResponseSchema,
  DeploymentSystem,
} from '@/types/deploy'

const genHex = () =>
  '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')

const buildMockData = (): DeploymentBasics => {
  const now = Date.now()
  return {
    registrationVerifier: genHex(),
    mintVerifier: genHex(),
    withdrawVerifier: genHex(),
    transferVerifier: genHex(),
    babyJubJub: genHex(),
    deploymentFile: `deployments/converter/converter-${now}.json`,
    erc20Token: genHex(),
  }
}

const buildMockSystem = (): DeploymentSystem => {
  const now = Date.now()
  return {
    registrar: genHex(),
    encryptedERC: genHex(),
    registrationVerifier: genHex(),
    mintVerifier: genHex(),
    withdrawVerifier: genHex(),
    transferVerifier: genHex(),
    babyJubJub: genHex(),
    deploymentFile: `deployments/converter/converter-${now}.json`,
    erc20Token: genHex(),
  }
}

// Modular function to perform the POST. If no baseURL is configured,
// it returns a validated mock with the same shape.
export const deployBasics = async (payload?: Record<string, unknown>): Promise<DeployBasicsResponse> => {
  const start = performance.now()

  // If http has no baseURL, we provide a mock response without calling any endpoint
  if (!http.defaults.baseURL) {
    const data = buildMockData()
    const res: DeployBasicsResponse = {
      success: true,
      message: 'Basic components deployed successfully',
      data,
      timestamp: new Date().toISOString(),
      executionTime: Math.max(1, Math.round(performance.now() - start)),
    }
    // Validate to ensure reusability and stability of shape
    return DeployBasicsResponseSchema.parse(res)
  }

  try {
    const timeout = Number(
      (import.meta.env.VITE_DEPLOY_BASICS_TIMEOUT_MS as string | undefined) ||
      (import.meta.env.VITE_HTTP_TIMEOUT_MS as string | undefined) ||
      120_000,
    )
    const { data } = await http.post('/api/converter/deploy-basics', payload ?? {}, {
      timeout: Number.isFinite(timeout) ? timeout : 120_000,
    })
    // Accept either full response or raw data payload from a backend
    const shaped: DeployBasicsResponse = data?.success !== undefined
      ? data
      : {
          success: true,
          message: 'Converter basic components deployed successfully',
          data,
          timestamp: new Date().toISOString(),
          executionTime: Math.max(1, Math.round(performance.now() - start)),
        }
    return DeployBasicsResponseSchema.parse(shaped)
  } catch (err) {
    throw toHttpError(err)
  }
}

export const deploySystem = async (payload?: Record<string, unknown>): Promise<DeploySystemResponse> => {
  const start = performance.now()

  if (!http.defaults.baseURL) {
    const data = buildMockSystem()
    const res: DeploySystemResponse = {
      success: true,
      message: 'Sistema desplegado exitosamente',
      data,
      timestamp: new Date().toISOString(),
      executionTime: Math.max(1, Math.round(performance.now() - start)),
    }
    return DeploySystemResponseSchema.parse(res)
  }

  try {
    const timeout = Number(
      (import.meta.env.VITE_DEPLOY_SYSTEM_TIMEOUT_MS as string | undefined) ||
      (import.meta.env.VITE_HTTP_TIMEOUT_MS as string | undefined) ||
      180_000,
    )
    const { data } = await http.post('/api/converter/deploy-system', payload ?? {}, {
      timeout: Number.isFinite(timeout) ? timeout : 180_000,
    })
    const shaped: DeploySystemResponse = data?.success !== undefined
      ? data
      : {
          success: true,
          message: 'Sistema desplegado exitosamente',
          data,
          timestamp: new Date().toISOString(),
          executionTime: Math.max(1, Math.round(performance.now() - start)),
        }
    return DeploySystemResponseSchema.parse(shaped)
  } catch (err) {
    throw toHttpError(err)
  }
}
