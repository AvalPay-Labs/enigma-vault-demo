import axios from 'axios'
import { randomHex } from '../utils/eth.js'

export const withdrawService = async (payload = {}) => {
  const { DEPLOY_SERVICE_URL } = process.env

  if (DEPLOY_SERVICE_URL) {
    try {
      const { data } = await axios.post(
        `${DEPLOY_SERVICE_URL.replace(/\/$/, '')}/withdraw`,
        payload,
        { timeout: 120_000 },
      )
      return data?.data || data
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Unknown error'
      const status = err?.response?.status || 502
      const code = err?.code
      const details = err?.response?.data || undefined
      const error = new Error(`Upstream withdraw service error: ${message}`)
      error.status = status
      error.code = code
      error.details = details
      throw error
    }
  }

  const walletNumber = Number(payload?.walletNumber ?? 1)
  return {
    transactionHash: randomHex(64),
    walletNumber,
  }
}

