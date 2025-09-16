import { http, toHttpError } from '@/lib/axios'
import {
  DeployBasicsResponse,
  DeployBasicsResponseSchema,
  DeploymentBasics,
  DeploySystemResponse,
  DeploySystemResponseSchema,
  DeploymentSystem,
  RegisterUserResponse,
  RegisterUserResponseSchema,
  SetAuditorResponse,
  SetAuditorResponseSchema,
  GetFaucetResponse,
  GetFaucetResponseSchema,
  ConverterTransferResponse,
  ConverterTransferResponseSchema,
  ConverterBalanceResponse,
  ConverterBalanceResponseSchema,
  DepositResponse,
  DepositResponseSchema,
  WithdrawResponse,
  WithdrawResponseSchema,
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

export const registerUser = async (
  payload?: { walletNumber?: number; walletAddress?: string },
): Promise<RegisterUserResponse> => {
  const start = performance.now()
  const envWallet = (import.meta.env.VITE_CONVERTER_WALLET_ADDRESS as string | undefined)?.trim()
  const walletNumber = payload?.walletNumber ?? 1
  const walletAddress = (payload?.walletAddress || envWallet || '').trim()

  if (http.defaults.baseURL && !walletAddress) {
    throw new Error('Missing walletAddress: configure VITE_CONVERTER_WALLET_ADDRESS')
  }

  if (!http.defaults.baseURL) {
    const data = {
      userAddress: walletAddress || genHex(),
      balance: 1.5,
      walletNumber,
      role: 'auditor',
      module: 'converter',
    }
    const res: RegisterUserResponse = {
      success: true,
      message: 'Usuario registrado exitosamente',
      data,
      timestamp: new Date().toISOString(),
      executionTime: Math.max(1, Math.round(performance.now() - start)),
    }
    return RegisterUserResponseSchema.parse(res)
  }

  try {
    const timeout = Number(
      (import.meta.env.VITE_REGISTER_USER_TIMEOUT_MS as string | undefined) ||
      (import.meta.env.VITE_HTTP_TIMEOUT_MS as string | undefined) ||
      60_000,
    )
    const { data } = await http.post('/api/converter/register-user', { walletNumber, walletAddress }, {
      timeout: Number.isFinite(timeout) ? timeout : 60_000,
    })
    const shaped: RegisterUserResponse = data?.success !== undefined
      ? data
      : {
          success: true,
          message: 'Usuario registrado exitosamente',
          data,
          timestamp: new Date().toISOString(),
          executionTime: Math.max(1, Math.round(performance.now() - start)),
        }
    return RegisterUserResponseSchema.parse(shaped)
  } catch (err) {
    throw toHttpError(err)
  }
}

export const deposit = async (
  payload?: { walletNumber?: number; walletAddress?: string },
): Promise<DepositResponse> => {
  const start = performance.now()
  const envWallet = (import.meta.env.VITE_CONVERTER_WALLET_ADDRESS as string | undefined)?.trim()
  const walletNumber = payload?.walletNumber ?? 1
  const walletAddress = (payload?.walletAddress || envWallet || '').trim()

  if (http.defaults.baseURL && !walletAddress) {
    throw new Error('Missing walletAddress: configure VITE_CONVERTER_WALLET_ADDRESS')
  }

  if (!http.defaults.baseURL) {
    const data = {
      transactionHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      walletNumber,
    }
    const res: DepositResponse = {
      success: true,
      message: 'Tokens depositados exitosamente',
      data,
      timestamp: new Date().toISOString(),
      executionTime: Math.max(1, Math.round(performance.now() - start)),
    }
    return DepositResponseSchema.parse(res)
  }

  try {
    const timeout = Number(
      (import.meta.env.VITE_DEPOSIT_TIMEOUT_MS as string | undefined) ||
      (import.meta.env.VITE_HTTP_TIMEOUT_MS as string | undefined) ||
      120_000,
    )
    const { data } = await http.post('/api/converter/deposit', { walletNumber, walletAddress }, {
      timeout: Number.isFinite(timeout) ? timeout : 120_000,
    })
    const shaped: DepositResponse = data?.success !== undefined
      ? data
      : {
          success: true,
          message: 'Tokens depositados exitosamente',
          data,
          timestamp: new Date().toISOString(),
          executionTime: Math.max(1, Math.round(performance.now() - start)),
        }
    return DepositResponseSchema.parse(shaped)
  } catch (err) {
    throw toHttpError(err)
  }
}

export const withdraw = async (
  payload?: { walletNumber?: number; walletAddress?: string },
): Promise<WithdrawResponse> => {
  const start = performance.now()
  const envWallet = (import.meta.env.VITE_CONVERTER_WALLET_ADDRESS as string | undefined)?.trim()
  const walletNumber = payload?.walletNumber ?? 1
  const walletAddress = (payload?.walletAddress || envWallet || '').trim()

  if (http.defaults.baseURL && !walletAddress) {
    throw new Error('Missing walletAddress: configure VITE_CONVERTER_WALLET_ADDRESS')
  }

  if (!http.defaults.baseURL) {
    const data = {
      transactionHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      walletNumber,
    }
    const res: WithdrawResponse = {
      success: true,
      message: 'Tokens retirados exitosamente',
      data,
      timestamp: new Date().toISOString(),
      executionTime: Math.max(1, Math.round(performance.now() - start)),
    }
    return WithdrawResponseSchema.parse(res)
  }

  try {
    const timeout = Number(
      (import.meta.env.VITE_WITHDRAW_TIMEOUT_MS as string | undefined) ||
      (import.meta.env.VITE_HTTP_TIMEOUT_MS as string | undefined) ||
      120_000,
    )
    const { data } = await http.post('/api/converter/withdraw', { walletNumber, walletAddress }, {
      timeout: Number.isFinite(timeout) ? timeout : 120_000,
    })
    const shaped: WithdrawResponse = data?.success !== undefined
      ? data
      : {
          success: true,
          message: 'Tokens retirados exitosamente',
          data,
          timestamp: new Date().toISOString(),
          executionTime: Math.max(1, Math.round(performance.now() - start)),
        }
    return WithdrawResponseSchema.parse(shaped)
  } catch (err) {
    throw toHttpError(err)
  }
}

// Set auditor (Converter)
export const setAuditor = async (
  payload?: { walletNumber?: number; walletAddress?: string },
): Promise<SetAuditorResponse> => {
  const start = performance.now()
  const envWallet = (import.meta.env.VITE_CONVERTER_WALLET_ADDRESS as string | undefined)?.trim()
  const walletNumber = payload?.walletNumber ?? 1
  const walletAddress = (payload?.walletAddress || envWallet || '').trim()

  if (http.defaults.baseURL && !walletAddress) {
    throw new Error('Missing walletAddress: configure VITE_CONVERTER_WALLET_ADDRESS')
  }

  if (!http.defaults.baseURL) {
    const res: SetAuditorResponse = {
      success: true,
      message: 'Auditor configurado exitosamente',
      data: { status: 'auditor_configured', walletNumber },
      timestamp: new Date().toISOString(),
      executionTime: Math.max(1, Math.round(performance.now() - start)),
    }
    return SetAuditorResponseSchema.parse(res)
  }

  try {
    const timeout = Number(
      (import.meta.env.VITE_SET_AUDITOR_TIMEOUT_MS as string | undefined) ||
      (import.meta.env.VITE_HTTP_TIMEOUT_MS as string | undefined) ||
      60_000,
    )
    const { data } = await http.post('/api/converter/set-auditor', { walletNumber, walletAddress }, {
      timeout: Number.isFinite(timeout) ? timeout : 60_000,
    })
    const shaped: SetAuditorResponse = data?.success !== undefined
      ? data
      : {
          success: true,
          message: 'Auditor configurado exitosamente',
          data,
          timestamp: new Date().toISOString(),
          executionTime: Math.max(1, Math.round(performance.now() - start)),
        }
    return SetAuditorResponseSchema.parse(shaped)
  } catch (err) {
    throw toHttpError(err)
  }
}

// Get faucet (Converter)
export const getFaucet = async (
  payload?: { walletNumber?: number; walletAddress?: string },
): Promise<GetFaucetResponse> => {
  const start = performance.now()
  const envWallet = (import.meta.env.VITE_CONVERTER_WALLET_ADDRESS as string | undefined)?.trim()
  const walletNumber = payload?.walletNumber ?? 1
  const walletAddress = (payload?.walletAddress || envWallet || '').trim()

  if (http.defaults.baseURL && !walletAddress) {
    throw new Error('Missing walletAddress: configure VITE_CONVERTER_WALLET_ADDRESS')
  }

  if (!http.defaults.baseURL) {
    const data = {
      transactionHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      walletNumber,
    }
    const res: GetFaucetResponse = {
      success: true,
      message: 'Tokens de faucet obtenidos exitosamente',
      data,
      timestamp: new Date().toISOString(),
      executionTime: Math.max(1, Math.round(performance.now() - start)),
    }
    return GetFaucetResponseSchema.parse(res)
  }

  try {
    const timeout = Number(
      (import.meta.env.VITE_GET_FAUCET_TIMEOUT_MS as string | undefined) ||
      (import.meta.env.VITE_HTTP_TIMEOUT_MS as string | undefined) ||
      60_000,
    )
    const { data } = await http.post('/api/converter/get-faucet', { walletNumber, walletAddress }, {
      timeout: Number.isFinite(timeout) ? timeout : 60_000,
    })
    const shaped: GetFaucetResponse = data?.success !== undefined
      ? data
      : {
          success: true,
          message: 'Tokens de faucet obtenidos exitosamente',
          data,
          timestamp: new Date().toISOString(),
          executionTime: Math.max(1, Math.round(performance.now() - start)),
        }
    return GetFaucetResponseSchema.parse(shaped)
  } catch (err) {
    throw toHttpError(err)
  }
}

// Transfer encrypted tokens (Converter)
export const transfer = async (
  payload?: { senderWalletNumber?: number; senderWalletAddress?: string; receiverWalletNumber?: number; receiverWalletAddress?: string; amount?: number },
): Promise<ConverterTransferResponse> => {
  const start = performance.now()
  const envWallet = (import.meta.env.VITE_CONVERTER_WALLET_ADDRESS as string | undefined)?.trim()
  const senderWalletNumber = payload?.senderWalletNumber ?? 1
  const senderWalletAddress = (payload?.senderWalletAddress || envWallet || '').trim()
  const receiverWalletNumber = payload?.receiverWalletNumber ?? 2
  const receiverWalletAddress = payload?.receiverWalletAddress
  const amount = payload?.amount ?? 30

  if (http.defaults.baseURL && !senderWalletAddress) {
    throw new Error('Missing senderWalletAddress: configure VITE_CONVERTER_WALLET_ADDRESS')
  }

  if (!http.defaults.baseURL) {
    const data = {
      transactionHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      senderWallet: senderWalletNumber,
      receiverWallet: receiverWalletNumber,
      senderWalletAddress: senderWalletAddress || genHex(),
      receiverWalletAddress,
      amount,
    }
    const res: ConverterTransferResponse = {
      success: true,
      message: 'Transferencia completada exitosamente',
      data,
      timestamp: new Date().toISOString(),
      executionTime: Math.max(1, Math.round(performance.now() - start)),
    }
    return ConverterTransferResponseSchema.parse(res)
  }

  try {
    const timeout = Number(
      (import.meta.env.VITE_TRANSFER_TIMEOUT_MS as string | undefined) ||
      (import.meta.env.VITE_HTTP_TIMEOUT_MS as string | undefined) ||
      120_000,
    )
    const requestBody: any = {
      senderWalletNumber,
      senderWalletAddress,
      receiverWalletNumber,
      amount,
    }
    if (receiverWalletAddress) requestBody.receiverWalletAddress = receiverWalletAddress

    const { data } = await http.post('/api/converter/transfer', requestBody, { timeout: Number.isFinite(timeout) ? timeout : 120_000 })
    const shaped: ConverterTransferResponse = data?.success !== undefined
      ? data
      : {
          success: true,
          message: 'Transferencia completada exitosamente',
          data,
          timestamp: new Date().toISOString(),
          executionTime: Math.max(1, Math.round(performance.now() - start)),
        }
    return ConverterTransferResponseSchema.parse(shaped)
  } catch (err) {
    throw toHttpError(err)
  }
}

// Get encrypted balance (Converter)
export const getBalance = async (walletNumber: number): Promise<ConverterBalanceResponse> => {
  const start = performance.now()

  if (!http.defaults.baseURL) {
    const data = {
      walletNumber,
      walletAddress: genHex(),
      walletIdentifier: walletNumber.toString(),
      encryptedBalance: 0,
    }
    const res: ConverterBalanceResponse = {
      success: true,
      message: 'Balance verificado exitosamente',
      data,
      timestamp: new Date().toISOString(),
      executionTime: Math.max(1, Math.round(performance.now() - start)),
    }
    return ConverterBalanceResponseSchema.parse(res)
  }

  try {
    const timeout = Number(
      (import.meta.env.VITE_BALANCE_TIMEOUT_MS as string | undefined) ||
      (import.meta.env.VITE_HTTP_TIMEOUT_MS as string | undefined) ||
      30_000,
    )
    const { data } = await http.get(`/api/converter/balance/${walletNumber}`, { timeout: Number.isFinite(timeout) ? timeout : 30_000 })
    const shaped: ConverterBalanceResponse = data?.success !== undefined
      ? data
      : {
          success: true,
          message: 'Balance verificado exitosamente',
          data,
          timestamp: new Date().toISOString(),
          executionTime: Math.max(1, Math.round(performance.now() - start)),
        }
    return ConverterBalanceResponseSchema.parse(shaped)
  } catch (err) {
    throw toHttpError(err)
  }
}
