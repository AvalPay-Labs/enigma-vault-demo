import { http, toHttpError } from '@/lib/axios'
import {
  StandaloneDeployBasicsResponse,
  StandaloneDeployBasicsResponseSchema,
  StandaloneDeploymentBasics,
  StandaloneDeploySystemResponse,
  StandaloneDeploySystemResponseSchema,
  StandaloneDeploymentSystem,
  StandaloneRegisterUserResponse,
  StandaloneRegisterUserResponseSchema,
  StandaloneSetAuditorResponse,
  StandaloneSetAuditorResponseSchema,
  StandaloneMintResponse,
  StandaloneMintResponseSchema,
  StandaloneBalanceResponse,
  StandaloneBalanceResponseSchema,
  StandaloneTransferResponse,
  StandaloneTransferResponseSchema,
  StandaloneBurnResponse,
  StandaloneBurnResponseSchema,
  WalletRequest,
  MintRequest,
  TransferRequest,
  BurnRequest,
} from '@/types/standalone'

const genHex = () =>
  '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')

const buildMockStandaloneBasics = (): StandaloneDeploymentBasics => {
  const now = Date.now()
  return {
    registrationVerifier: genHex(),
    mintVerifier: genHex(),
    withdrawVerifier: genHex(),
    transferVerifier: genHex(),
    burnVerifier: genHex(),
    babyJubJub: genHex(),
    deploymentFile: `deployments/standalone/standalone-${now}.json`,
  }
}

const buildMockStandaloneSystem = (): StandaloneDeploymentSystem => {
  const now = Date.now()
  return {
    registrar: genHex(),
    encryptedERC: genHex(),
    registrationVerifier: genHex(),
    mintVerifier: genHex(),
    withdrawVerifier: genHex(),
    transferVerifier: genHex(),
    burnVerifier: genHex(),
    babyJubJub: genHex(),
    deploymentFile: `deployments/standalone/standalone-${now}.json`,
  }
}

// Deploy basic components of the standalone system
export const deployStandaloneBasics = async (payload?: Record<string, unknown>): Promise<StandaloneDeployBasicsResponse> => {
  const start = performance.now()

  // If http has no baseURL, we provide a mock response
  if (!http.defaults.baseURL) {
    const data = buildMockStandaloneBasics()
    const res: StandaloneDeployBasicsResponse = {
      success: true,
      message: 'Basic components deployed successfully',
      data,
      timestamp: new Date().toISOString(),
      executionTime: Math.max(1, Math.round(performance.now() - start)),
    }
    return StandaloneDeployBasicsResponseSchema.parse(res)
  }

  try {
    const timeout = Number(
      (import.meta.env.VITE_DEPLOY_BASICS_TIMEOUT_MS as string | undefined) ||
      (import.meta.env.VITE_HTTP_TIMEOUT_MS as string | undefined) ||
      120_000,
    )
    const { data } = await http.post('/api/standalone/deploy-basics', payload ?? {}, {
      timeout: Number.isFinite(timeout) ? timeout : 120_000,
    })
    
    const shaped: StandaloneDeployBasicsResponse = data?.success !== undefined
      ? data
      : {
          success: true,
          message: 'Basic components deployed successfully',
          data,
          timestamp: new Date().toISOString(),
          executionTime: Math.max(1, Math.round(performance.now() - start)),
        }
    return StandaloneDeployBasicsResponseSchema.parse(shaped)
  } catch (err) {
    throw toHttpError(err)
  }
}

// Deploy complete standalone system
export const deployStandaloneSystem = async (payload?: Record<string, unknown>): Promise<StandaloneDeploySystemResponse> => {
  const start = performance.now()

  if (!http.defaults.baseURL) {
    const data = buildMockStandaloneSystem()
    const res: StandaloneDeploySystemResponse = {
      success: true,
      message: 'Sistema desplegado exitosamente',
      data,
      timestamp: new Date().toISOString(),
      executionTime: Math.max(1, Math.round(performance.now() - start)),
    }
    return StandaloneDeploySystemResponseSchema.parse(res)
  }

  try {
    const timeout = Number(
      (import.meta.env.VITE_DEPLOY_SYSTEM_TIMEOUT_MS as string | undefined) ||
      (import.meta.env.VITE_HTTP_TIMEOUT_MS as string | undefined) ||
      180_000,
    )
    const { data } = await http.post('/api/standalone/deploy-system', payload ?? {}, {
      timeout: Number.isFinite(timeout) ? timeout : 180_000,
    })
    
    const shaped: StandaloneDeploySystemResponse = data?.success !== undefined
      ? data
      : {
          success: true,
          message: 'Sistema desplegado exitosamente',
          data,
          timestamp: new Date().toISOString(),
          executionTime: Math.max(1, Math.round(performance.now() - start)),
        }
    return StandaloneDeploySystemResponseSchema.parse(shaped)
  } catch (err) {
    throw toHttpError(err)
  }
}

// Register user in standalone system
export const registerStandaloneUser = async (payload?: WalletRequest): Promise<StandaloneRegisterUserResponse> => {
  const start = performance.now()
  const envWallet = (import.meta.env.VITE_STANDALONE_WALLET_ADDRESS as string | undefined)?.trim()
  const walletNumber = payload?.walletNumber ?? 1
  const walletAddress = (payload?.walletAddress || envWallet || '').trim()

  if (http.defaults.baseURL && !walletAddress) {
    throw new Error('Missing walletAddress: configure VITE_STANDALONE_WALLET_ADDRESS')
  }

  if (!http.defaults.baseURL) {
    const data = {
      userAddress: walletAddress || genHex(),
      balance: 1.5,
      walletNumber,
    }
    const res: StandaloneRegisterUserResponse = {
      success: true,
      message: 'Usuario registrado exitosamente',
      data,
      timestamp: new Date().toISOString(),
      executionTime: Math.max(1, Math.round(performance.now() - start)),
    }
    return StandaloneRegisterUserResponseSchema.parse(res)
  }

  try {
    const timeout = Number(
      (import.meta.env.VITE_REGISTER_USER_TIMEOUT_MS as string | undefined) ||
      (import.meta.env.VITE_HTTP_TIMEOUT_MS as string | undefined) ||
      60_000,
    )
    const { data } = await http.post('/api/standalone/register-user', { walletNumber, walletAddress }, {
      timeout: Number.isFinite(timeout) ? timeout : 60_000,
    })
    
    const shaped: StandaloneRegisterUserResponse = data?.success !== undefined
      ? data
      : {
          success: true,
          message: 'Usuario registrado exitosamente',
          data,
          timestamp: new Date().toISOString(),
          executionTime: Math.max(1, Math.round(performance.now() - start)),
        }
    return StandaloneRegisterUserResponseSchema.parse(shaped)
  } catch (err) {
    throw toHttpError(err)
  }
}

// Register auditor as user
export const registerStandaloneAuditor = async (payload?: WalletRequest): Promise<StandaloneRegisterUserResponse> => {
  const start = performance.now()
  const envWallet = (import.meta.env.VITE_STANDALONE_WALLET_ADDRESS as string | undefined)?.trim()
  const walletNumber = payload?.walletNumber ?? 1
  const walletAddress = (payload?.walletAddress || envWallet || '').trim()

  if (http.defaults.baseURL && !walletAddress) {
    throw new Error('Missing walletAddress: configure VITE_STANDALONE_WALLET_ADDRESS')
  }

  if (!http.defaults.baseURL) {
    const data = {
      userAddress: walletAddress || genHex(),
      balance: 1.5,
      walletNumber,
    }
    const res: StandaloneRegisterUserResponse = {
      success: true,
      message: 'Auditor registrado como usuario exitosamente',
      data,
      timestamp: new Date().toISOString(),
      executionTime: Math.max(1, Math.round(performance.now() - start)),
    }
    return StandaloneRegisterUserResponseSchema.parse(res)
  }

  try {
    const timeout = Number(
      (import.meta.env.VITE_REGISTER_AUDITOR_TIMEOUT_MS as string | undefined) ||
      (import.meta.env.VITE_HTTP_TIMEOUT_MS as string | undefined) ||
      60_000,
    )
    const { data } = await http.post('/api/standalone/register-auditor', { walletNumber, walletAddress }, {
      timeout: Number.isFinite(timeout) ? timeout : 60_000,
    })
    
    const shaped: StandaloneRegisterUserResponse = data?.success !== undefined
      ? data
      : {
          success: true,
          message: 'Auditor registrado como usuario exitosamente',
          data,
          timestamp: new Date().toISOString(),
          executionTime: Math.max(1, Math.round(performance.now() - start)),
        }
    return StandaloneRegisterUserResponseSchema.parse(shaped)
  } catch (err) {
    throw toHttpError(err)
  }
}

// Set auditor
export const setStandaloneAuditor = async (payload?: WalletRequest): Promise<StandaloneSetAuditorResponse> => {
  const start = performance.now()
  const envWallet = (import.meta.env.VITE_STANDALONE_WALLET_ADDRESS as string | undefined)?.trim()
  const walletNumber = payload?.walletNumber ?? 1
  const walletAddress = (payload?.walletAddress || envWallet || '').trim()

  if (http.defaults.baseURL && !walletAddress) {
    throw new Error('Missing walletAddress: configure VITE_STANDALONE_WALLET_ADDRESS')
  }

  if (!http.defaults.baseURL) {
    const res: StandaloneSetAuditorResponse = {
      success: true,
      message: 'Auditor configurado exitosamente',
      data: {},
      timestamp: new Date().toISOString(),
      executionTime: Math.max(1, Math.round(performance.now() - start)),
    }
    return StandaloneSetAuditorResponseSchema.parse(res)
  }

  try {
    const timeout = Number(
      (import.meta.env.VITE_SET_AUDITOR_TIMEOUT_MS as string | undefined) ||
      (import.meta.env.VITE_HTTP_TIMEOUT_MS as string | undefined) ||
      60_000,
    )
    const { data } = await http.post('/api/standalone/set-auditor', { walletNumber, walletAddress }, {
      timeout: Number.isFinite(timeout) ? timeout : 60_000,
    })
    
    const shaped: StandaloneSetAuditorResponse = data?.success !== undefined
      ? data
      : {
          success: true,
          message: 'Auditor configurado exitosamente',
          data: {},
          timestamp: new Date().toISOString(),
          executionTime: Math.max(1, Math.round(performance.now() - start)),
        }
    return StandaloneSetAuditorResponseSchema.parse(shaped)
  } catch (err) {
    throw toHttpError(err)
  }
}

// Mint encrypted tokens
export const mintStandaloneTokens = async (payload?: MintRequest): Promise<StandaloneMintResponse> => {
  const start = performance.now()
  const envWallet = (import.meta.env.VITE_STANDALONE_WALLET_ADDRESS as string | undefined)?.trim()
  const ownerWalletNumber = payload?.ownerWalletNumber ?? 1
  const ownerWalletAddress = (payload?.ownerWalletAddress || envWallet || '').trim()
  const userWalletNumber = payload?.userWalletNumber ?? 2
  const userWalletAddress = payload?.userWalletAddress
  const amount = payload?.amount ?? 50

  if (http.defaults.baseURL && !ownerWalletAddress) {
    throw new Error('Missing ownerWalletAddress: configure VITE_STANDALONE_WALLET_ADDRESS')
  }

  if (!http.defaults.baseURL) {
    const data = {
      amount,
      transactionHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      ownerWallet: ownerWalletNumber,
      userWallet: userWalletNumber,
      ownerWalletAddress: ownerWalletAddress || genHex(),
      userWalletAddress,
    }
    const res: StandaloneMintResponse = {
      success: true,
      message: 'Tokens minted successfully',
      data,
      timestamp: new Date().toISOString(),
      executionTime: Math.max(1, Math.round(performance.now() - start)),
    }
    return StandaloneMintResponseSchema.parse(res)
  }

  try {
    const timeout = Number(
      (import.meta.env.VITE_MINT_TIMEOUT_MS as string | undefined) ||
      (import.meta.env.VITE_HTTP_TIMEOUT_MS as string | undefined) ||
      120_000,
    )
    const requestBody: any = {
      ownerWalletNumber,
      ownerWalletAddress,
      userWalletNumber,
      amount,
    }
    
    // Only include userWalletAddress if it's provided
    if (userWalletAddress) {
      requestBody.userWalletAddress = userWalletAddress
    }
    
    const { data } = await http.post('/api/standalone/mint', requestBody, {
      timeout: Number.isFinite(timeout) ? timeout : 120_000,
    })
    
    const shaped: StandaloneMintResponse = data?.success !== undefined
      ? data
      : {
          success: true,
          message: 'Tokens minted successfully',
          data,
          timestamp: new Date().toISOString(),
          executionTime: Math.max(1, Math.round(performance.now() - start)),
        }
    return StandaloneMintResponseSchema.parse(shaped)
  } catch (err) {
    throw toHttpError(err)
  }
}

// Check balance
export const getStandaloneBalance = async (walletNumber: number): Promise<StandaloneBalanceResponse> => {
  const start = performance.now()

  if (!http.defaults.baseURL) {
    const data = {
      walletNumber,
      walletAddress: genHex(),
      walletIdentifier: walletNumber.toString(),
      encryptedBalance: 50.5,
    }
    const res: StandaloneBalanceResponse = {
      success: true,
      message: 'Balance verificado exitosamente',
      data,
      timestamp: new Date().toISOString(),
      executionTime: Math.max(1, Math.round(performance.now() - start)),
    }
    return StandaloneBalanceResponseSchema.parse(res)
  }

  try {
    const timeout = Number(
      (import.meta.env.VITE_BALANCE_TIMEOUT_MS as string | undefined) ||
      (import.meta.env.VITE_HTTP_TIMEOUT_MS as string | undefined) ||
      30_000,
    )
    const { data } = await http.get(`/api/standalone/balance/${walletNumber}`, {
      timeout: Number.isFinite(timeout) ? timeout : 30_000,
    })
    
    const shaped: StandaloneBalanceResponse = data?.success !== undefined
      ? data
      : {
          success: true,
          message: 'Balance verificado exitosamente',
          data,
          timestamp: new Date().toISOString(),
          executionTime: Math.max(1, Math.round(performance.now() - start)),
        }
    return StandaloneBalanceResponseSchema.parse(shaped)
  } catch (err) {
    throw toHttpError(err)
  }
}

// Transfer encrypted tokens
export const transferStandaloneTokens = async (payload?: TransferRequest): Promise<StandaloneTransferResponse> => {
  const start = performance.now()
  const envWallet = (import.meta.env.VITE_STANDALONE_WALLET_ADDRESS as string | undefined)?.trim()
  const senderWalletNumber = payload?.senderWalletNumber ?? 1
  const senderWalletAddress = (payload?.senderWalletAddress || envWallet || '').trim()
  const receiverWalletNumber = payload?.receiverWalletNumber ?? 2
  const receiverWalletAddress = payload?.receiverWalletAddress
  const amount = payload?.amount ?? 30

  if (http.defaults.baseURL && !senderWalletAddress) {
    throw new Error('Missing senderWalletAddress: configure VITE_STANDALONE_WALLET_ADDRESS')
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
    const res: StandaloneTransferResponse = {
      success: true,
      message: 'Transferencia completada exitosamente',
      data,
      timestamp: new Date().toISOString(),
      executionTime: Math.max(1, Math.round(performance.now() - start)),
    }
    return StandaloneTransferResponseSchema.parse(res)
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
    
    // Only include receiverWalletAddress if it's provided
    if (receiverWalletAddress) {
      requestBody.receiverWalletAddress = receiverWalletAddress
    }
    
    const { data } = await http.post('/api/standalone/transfer', requestBody, {
      timeout: Number.isFinite(timeout) ? timeout : 120_000,
    })
    
    const shaped: StandaloneTransferResponse = data?.success !== undefined
      ? data
      : {
          success: true,
          message: 'Transferencia completada exitosamente',
          data,
          timestamp: new Date().toISOString(),
          executionTime: Math.max(1, Math.round(performance.now() - start)),
        }
    return StandaloneTransferResponseSchema.parse(shaped)
  } catch (err) {
    throw toHttpError(err)
  }
}

// Burn encrypted tokens
export const burnStandaloneTokens = async (payload?: BurnRequest): Promise<StandaloneBurnResponse> => {
  const start = performance.now()
  const envWallet = (import.meta.env.VITE_STANDALONE_WALLET_ADDRESS as string | undefined)?.trim()
  const walletNumber = payload?.walletNumber ?? 2
  const walletAddress = (payload?.walletAddress || envWallet || '').trim()
  const amount = payload?.amount ?? 20

  if (http.defaults.baseURL && !walletAddress) {
    throw new Error('Missing walletAddress: configure VITE_STANDALONE_WALLET_ADDRESS')
  }

  if (!http.defaults.baseURL) {
    const data = {
      walletNumber,
      burnedAmount: amount,
    }
    const res: StandaloneBurnResponse = {
      success: true,
      message: 'Tokens quemados exitosamente',
      data,
      timestamp: new Date().toISOString(),
      executionTime: Math.max(1, Math.round(performance.now() - start)),
    }
    return StandaloneBurnResponseSchema.parse(res)
  }

  try {
    const timeout = Number(
      (import.meta.env.VITE_BURN_TIMEOUT_MS as string | undefined) ||
      (import.meta.env.VITE_HTTP_TIMEOUT_MS as string | undefined) ||
      120_000,
    )
    const { data } = await http.post('/api/standalone/burn', {
      walletNumber,
      walletAddress,
      amount,
    }, {
      timeout: Number.isFinite(timeout) ? timeout : 120_000,
    })
    
    const shaped: StandaloneBurnResponse = data?.success !== undefined
      ? data
      : {
          success: true,
          message: 'Tokens quemados exitosamente',
          data,
          timestamp: new Date().toISOString(),
          executionTime: Math.max(1, Math.round(performance.now() - start)),
        }
    return StandaloneBurnResponseSchema.parse(shaped)
  } catch (err) {
    throw toHttpError(err)
  }
}
