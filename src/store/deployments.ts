import type { DeployBasicsResponse, DeploymentBasics } from '@/types/deploy'

const KEY_LAST = 'deployments:last'
const KEY_LIST = 'deployments:list'
const KEY_LAST_SYSTEM = 'deployments:system:last'
const KEY_LIST_SYSTEM = 'deployments:system:list'

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

// System deployment storage
import type { DeploySystemResponse, DeploymentSystem } from '@/types/deploy'

export const saveSystemDeployment = (response: DeploySystemResponse) => {
  writeJSON(KEY_LAST_SYSTEM, response)
  const list = readJSON<DeploySystemResponse[]>(KEY_LIST_SYSTEM, [])
  list.unshift(response)
  writeJSON(KEY_LIST_SYSTEM, list.slice(0, 10))
}

export const getLastSystemDeployment = (): DeploySystemResponse | null => {
  return readJSON<DeploySystemResponse | null>(KEY_LAST_SYSTEM, null)
}

export const getLastSystemData = (): DeploymentSystem | null => {
  const last = getLastSystemDeployment()
  return last?.data ?? null
}

// Registered users storage
import type { RegisterUserResponse } from '@/types/deploy'

const KEY_LAST_REGISTER = 'converter:register:last'
const KEY_LIST_REGISTER = 'converter:register:list'

export const saveRegisteredUser = (response: RegisterUserResponse) => {
  writeJSON(KEY_LAST_REGISTER, response)
  const list = readJSON<RegisterUserResponse[]>(KEY_LIST_REGISTER, [])
  list.unshift(response)
  writeJSON(KEY_LIST_REGISTER, list.slice(0, 20))
}

export const getLastRegisteredUser = (): RegisterUserResponse | null => {
  return readJSON<RegisterUserResponse | null>(KEY_LAST_REGISTER, null)
}

// Deposit storage
import type { DepositResponse } from '@/types/deploy'

const KEY_LAST_DEPOSIT = 'converter:deposit:last'
const KEY_LIST_DEPOSIT = 'converter:deposit:list'

export const saveDeposit = (response: DepositResponse) => {
  writeJSON(KEY_LAST_DEPOSIT, response)
  const list = readJSON<DepositResponse[]>(KEY_LIST_DEPOSIT, [])
  list.unshift(response)
  writeJSON(KEY_LIST_DEPOSIT, list.slice(0, 20))
}

export const getLastDeposit = (): DepositResponse | null => {
  return readJSON<DepositResponse | null>(KEY_LAST_DEPOSIT, null)
}
