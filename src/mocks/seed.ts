import { saveDeployment, saveSystemDeployment, saveDeposit, saveWithdraw, saveRegisteredUser } from '@/store/deployments'
import type { DeployBasicsResponse, DeploySystemResponse, DepositResponse, WithdrawResponse, RegisterUserResponse } from '@/types/deploy'
import { deployBasics, deploySystem, registerUser, deposit, withdraw } from '@/services/converter'

const writeJSON = (key: string, value: any) => {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export const DEMO_KEYS = {
  user: 'enigma_user',
  tokens: 'demo:tokens',
  requests: 'demo:auditRequests',
}

export const seedDemoAppData = async () => {
  // Seed user
  writeJSON(DEMO_KEYS.user, {
    id: 1,
    name: 'Empresa Demo',
    email: 'demo@company.com',
    role: 'company',
  })

  // Seed tokens
  writeJSON(DEMO_KEYS.tokens, [
    { id: '1', name: 'PrivateToken', symbol: 'PRVT', balance: '1,000,000', auditor: 'Ana García', auditorExpiry: '2025-02-15' },
    { id: '2', name: 'CompanyToken', symbol: 'CMPY', balance: '500,000', auditor: null, auditorExpiry: null },
    { id: '3', name: 'StablePrivacy', symbol: 'eUSD', balance: '250,000', auditor: 'David Chen', auditorExpiry: '2025-03-10' },
    { id: '4', name: 'GamingGold', symbol: 'GGOLD', balance: '75,000', auditor: null, auditorExpiry: null },
  ])

  // Seed audit requests
  writeJSON(DEMO_KEYS.requests, [
    { id: 'r1', auditor: 'Laura Smith', tokenName: 'PrivateToken', reason: 'Compliance review', date: '2025-01-08', status: 'pending' },
    { id: 'r2', auditor: 'Jorge Pérez', tokenName: 'CompanyToken', reason: 'Quarterly audit', date: '2025-01-10', status: 'pending' },
  ])

  // Seed last run results for converter steps using service mocks (no network when VITE_USE_MOCKS=true)
  try {
    const basics: DeployBasicsResponse = await deployBasics()
    saveDeployment(basics)
    const system: DeploySystemResponse = await deploySystem()
    saveSystemDeployment(system)
    const reg: RegisterUserResponse = await registerUser()
    saveRegisteredUser(reg)
    const dep: DepositResponse = await deposit()
    saveDeposit(dep)
    const wit: WithdrawResponse = await withdraw()
    saveWithdraw(wit)
  } catch {
    // ignore if not in mock mode
  }
}

export const clearDemoAppData = () => {
  try {
    localStorage.removeItem(DEMO_KEYS.user)
    localStorage.removeItem(DEMO_KEYS.tokens)
    localStorage.removeItem(DEMO_KEYS.requests)
    localStorage.removeItem('deployments:last')
    localStorage.removeItem('deployments:list')
    localStorage.removeItem('deployments:system:last')
    localStorage.removeItem('deployments:system:list')
    localStorage.removeItem('converter:register:last')
    localStorage.removeItem('converter:register:list')
    localStorage.removeItem('converter:deposit:last')
    localStorage.removeItem('converter:deposit:list')
    localStorage.removeItem('converter:withdraw:last')
    localStorage.removeItem('converter:withdraw:list')
  } catch {}
}

