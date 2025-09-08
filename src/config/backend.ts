// Backend configuration
export const BACKEND_CONFIG = {
  // Base URL for the backend API
  baseURL: import.meta.env.VITE_DEPLOY_SERVICE_URL || 'https://enigma-backend.aiforworld.xyz',
  
  // Timeout configurations (in milliseconds)
  timeouts: {
    default: Number(import.meta.env.VITE_HTTP_TIMEOUT_MS) || 120000,
    deployBasics: Number(import.meta.env.VITE_DEPLOY_BASICS_TIMEOUT_MS) || 120000,
    deploySystem: Number(import.meta.env.VITE_DEPLOY_SYSTEM_TIMEOUT_MS) || 180000,
    registerUser: Number(import.meta.env.VITE_REGISTER_USER_TIMEOUT_MS) || 60000,
    registerAuditor: Number(import.meta.env.VITE_REGISTER_AUDITOR_TIMEOUT_MS) || 60000,
    setAuditor: Number(import.meta.env.VITE_SET_AUDITOR_TIMEOUT_MS) || 60000,
    mint: Number(import.meta.env.VITE_MINT_TIMEOUT_MS) || 120000,
    transfer: Number(import.meta.env.VITE_TRANSFER_TIMEOUT_MS) || 120000,
    burn: Number(import.meta.env.VITE_BURN_TIMEOUT_MS) || 120000,
    balance: Number(import.meta.env.VITE_BALANCE_TIMEOUT_MS) || 30000,
  },
  
  // Wallet addresses for testing (optional)
  wallets: {
    standalone: import.meta.env.VITE_STANDALONE_WALLET_ADDRESS || '0x0db58fFf8F2872c43785bb884397eDaD474b0ede',
    converter: import.meta.env.VITE_CONVERTER_WALLET_ADDRESS || '0x5E4aC881cCa68eB9D39D7ca55223EbD181204c0f',
  },
  
  // API endpoints
  endpoints: {
    standalone: {
      deployBasics: '/api/standalone/deploy-basics',
      deploySystem: '/api/standalone/deploy-system',
      registerUser: '/api/standalone/register-user',
      registerAuditor: '/api/standalone/register-auditor',
      setAuditor: '/api/standalone/set-auditor',
      mint: '/api/standalone/mint',
      balance: '/api/standalone/balance',
      transfer: '/api/standalone/transfer',
      burn: '/api/standalone/burn',
    },
    converter: {
      deployBasics: '/api/converter/deploy-basics',
      deploySystem: '/api/converter/deploy-system',
      registerUser: '/api/converter/register-user',
      deposit: '/api/converter/deposit',
      withdraw: '/api/converter/withdraw',
    },
    health: '/api/health',
  },
}

// Helper function to get full URL
export const getApiUrl = (endpoint: string): string => {
  return `${BACKEND_CONFIG.baseURL}${endpoint}`
}

// Helper function to get timeout for specific operation
export const getTimeout = (operation: keyof typeof BACKEND_CONFIG.timeouts): number => {
  return BACKEND_CONFIG.timeouts[operation]
}
