import axios from 'axios'
import { randomHexAddress } from '../utils/eth.js'
import { ensureDirAndFile } from '../utils/fs.js'

// This service coordinates the deployment basics operation.
// If DEPLOY_SERVICE_URL is set, it will call that service.
// Otherwise, it returns a mocked successful deployment payload.
export const deployBasicsService = async (payload = {}) => {
  const { DEPLOY_SERVICE_URL } = process.env

  if (DEPLOY_SERVICE_URL) {
    try {
      const { data } = await axios.post(
        `${DEPLOY_SERVICE_URL.replace(/\/$/, '')}/deploy-basics`,
        payload,
        { timeout: 30_000 },
      )
      // Expect the downstream service to return the expected shape.
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

  // Mocked local implementation: generate deterministic-looking addresses
  const now = Date.now()
  const deploymentFile = `deployments/converter/converter-${now}.json`

  const data = {
    registrationVerifier: randomHexAddress(),
    mintVerifier: randomHexAddress(),
    withdrawVerifier: randomHexAddress(),
    transferVerifier: randomHexAddress(),
    babyJubJub: randomHexAddress(),
    deploymentFile,
    erc20Token: randomHexAddress(),
  }

  // Persist a minimal mock deployment file to the repo for traceability
  await ensureDirAndFile(deploymentFile, JSON.stringify({
    generatedAt: new Date(now).toISOString(),
    data,
  }, null, 2))

  return data
}
