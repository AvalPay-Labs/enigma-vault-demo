import axios from 'axios'
import { randomHexAddress } from '../utils/eth.js'
import { ensureDirAndFile } from '../utils/fs.js'

export const deploySystemService = async (payload = {}) => {
  const { DEPLOY_SERVICE_URL } = process.env

  if (DEPLOY_SERVICE_URL) {
    try {
      const { data } = await axios.post(
        `${DEPLOY_SERVICE_URL.replace(/\/$/, '')}/deploy-system`,
        payload,
        { timeout: 5 * 60_000 },
      )
      return data?.data || data
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Unknown error'
      const status = err?.response?.status || 502
      const code = err?.code
      const details = err?.response?.data || undefined
      const error = new Error(`Upstream deploy service error: ${message}`)
      error.status = status
      error.code = code
      error.details = details
      throw error
    }
  }

  // Local mock
  const now = Date.now()
  const deploymentFile = `deployments/converter/converter-${now}.json`
  const data = {
    registrar: randomHexAddress(),
    encryptedERC: randomHexAddress(),
    registrationVerifier: randomHexAddress(),
    mintVerifier: randomHexAddress(),
    withdrawVerifier: randomHexAddress(),
    transferVerifier: randomHexAddress(),
    babyJubJub: randomHexAddress(),
    deploymentFile,
    erc20Token: randomHexAddress(),
  }

  await ensureDirAndFile(
    deploymentFile,
    JSON.stringify({ generatedAt: new Date(now).toISOString(), data }, null, 2),
  )

  return data
}
