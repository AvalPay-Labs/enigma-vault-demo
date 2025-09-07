import type { DeployBasicsResponse, DeploymentBasics } from '@/types/deploy'

const KEY_LAST = 'deployments:last'
const KEY_LIST = 'deployments:list'

const readJSON = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

const writeJSON = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore write errors (e.g., storage quota)
  }
}

export const saveDeployment = (response: DeployBasicsResponse) => {
  writeJSON(KEY_LAST, response)
  const list = readJSON<DeployBasicsResponse[]>(KEY_LIST, [])
  list.unshift(response)
  // Keep only latest 10
  writeJSON(KEY_LIST, list.slice(0, 10))
}

export const getLastDeployment = (): DeployBasicsResponse | null => {
  return readJSON<DeployBasicsResponse | null>(KEY_LAST, null)
}

export const getDeployments = (): DeployBasicsResponse[] => {
  return readJSON<DeployBasicsResponse[]>(KEY_LIST, [])
}

export const getLastDeploymentData = (): DeploymentBasics | null => {
  const last = getLastDeployment()
  return last?.data ?? null
}

