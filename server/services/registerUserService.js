import axios from 'axios'
import { randomHexAddress } from '../utils/eth.js'

export const registerUserService = async (payload = {}) => {
  const { DEPLOY_SERVICE_URL } = process.env

  if (DEPLOY_SERVICE_URL) {
    try {
      const { data } = await axios.post(
        `${DEPLOY_SERVICE_URL.replace(/\/$/, '')}/register-user`,
        payload,
        { timeout: 60_000 },
      )
      return data?.data || data
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Unknown error'
      const status = err?.response?.status || 502
      const code = err?.code
      const details = err?.response?.data || undefined
      const error = new Error(`Upstream register service error: ${message}`)
      error.status = status
      error.code = code
      error.details = details
      throw error
    }
  }

  const walletNumber = Number(payload?.walletNumber ?? 1)
  const envWallet = process.env.REGISTER_WALLET_ADDRESS || process.env.CONVERTER_WALLET_ADDRESS
  const userAddress = payload?.walletAddress || envWallet || randomHexAddress()

  return {
    userAddress,
    balance: 1.5,
    walletNumber,
    role: 'auditor',
    module: 'converter',
  }
}
