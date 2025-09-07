import { ContractConfig } from "../types/encryptedERC";

// Configuraciones de red
export const NETWORKS = {
  MAINNET: {
    chainId: 1,
    name: "Ethereum Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
    explorerUrl: "https://etherscan.io",
  },
  SEPOLIA: {
    chainId: 11155111,
    name: "Sepolia Testnet",
    rpcUrl: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
    explorerUrl: "https://sepolia.etherscan.io",
  },
  GOERLI: {
    chainId: 5,
    name: "Goerli Testnet",
    rpcUrl: "https://goerli.infura.io/v3/YOUR_INFURA_KEY",
    explorerUrl: "https://goerli.etherscan.io",
  },
  AVALANCHE: {
    chainId: 43114,
    name: "Avalanche C-Chain",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    explorerUrl: "https://snowtrace.io",
  },
  FUJI: {
    chainId: 43113,
    name: "Avalanche Fuji Testnet",
    rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
    explorerUrl: "https://testnet.snowtrace.io",
  },
  POLYGON: {
    chainId: 137,
    name: "Polygon Mainnet",
    rpcUrl: "https://polygon-rpc.com",
    explorerUrl: "https://polygonscan.com",
  },
  MUMBAI: {
    chainId: 80001,
    name: "Polygon Mumbai Testnet",
    rpcUrl: "https://rpc-mumbai.maticvigil.com",
    explorerUrl: "https://mumbai.polygonscan.com",
  },
} as const;

// Configuraciones del contrato por red
export const CONTRACT_CONFIGS: Record<string, ContractConfig> = {
  // Configuración para Sepolia (ejemplo)
  [NETWORKS.SEPOLIA.chainId]: {
    contractAddress: "0x1234567890123456789012345678901234567890", // Reemplazar con la dirección real
    rpcUrl: NETWORKS.SEPOLIA.rpcUrl,
    chainId: NETWORKS.SEPOLIA.chainId,
  },

  // Configuración para Fuji (ejemplo)
  [NETWORKS.FUJI.chainId]: {
    contractAddress: "0x1234567890123456789012345678901234567890", // Reemplazar con la dirección real
    rpcUrl: NETWORKS.FUJI.rpcUrl,
    chainId: NETWORKS.FUJI.chainId,
  },

  // Configuración para Mumbai (ejemplo)
  [NETWORKS.MUMBAI.chainId]: {
    contractAddress: "0x1234567890123456789012345678901234567890", // Reemplazar con la dirección real
    rpcUrl: NETWORKS.MUMBAI.rpcUrl,
    chainId: NETWORKS.MUMBAI.chainId,
  },
};

// Configuración por defecto
export const DEFAULT_CONFIG: ContractConfig = {
  contractAddress: "0x1234567890123456789012345678901234567890", // Reemplazar con la dirección real
  rpcUrl: NETWORKS.SEPOLIA.rpcUrl,
  chainId: NETWORKS.SEPOLIA.chainId,
};

// Configuración del entorno
export const ENV_CONFIG = {
  // Obtener configuración desde variables de entorno
  getContractConfig: (): ContractConfig => {
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    const rpcUrl = import.meta.env.VITE_RPC_URL;
    const chainId = import.meta.env.VITE_CHAIN_ID;

    if (contractAddress && rpcUrl && chainId) {
      return {
        contractAddress,
        rpcUrl,
        chainId: parseInt(chainId),
      };
    }

    return DEFAULT_CONFIG;
  },

  // Obtener configuración por ID de cadena
  getConfigByChainId: (chainId: number): ContractConfig => {
    return CONTRACT_CONFIGS[chainId] || DEFAULT_CONFIG;
  },

  // Obtener información de red por ID de cadena
  getNetworkInfo: (chainId: number) => {
    const network = Object.values(NETWORKS).find((n) => n.chainId === chainId);
    return network || null;
  },
};

// Configuraciones de gas
export const GAS_CONFIG = {
  // Límites de gas para diferentes operaciones
  DEPOSIT_GAS_LIMIT: 300000,
  WITHDRAW_GAS_LIMIT: 400000,
  TRANSFER_GAS_LIMIT: 350000,
  PRIVATE_MINT_GAS_LIMIT: 500000,
  PRIVATE_BURN_GAS_LIMIT: 450000,
  SET_AUDITOR_GAS_LIMIT: 200000,
  SET_BLACKLIST_GAS_LIMIT: 150000,

  // Multiplicador de gas para transacciones
  GAS_MULTIPLIER: 1.2,

  // Precio de gas por defecto (en gwei)
  DEFAULT_GAS_PRICE: 20,
};

// Configuraciones de UI
export const UI_CONFIG = {
  // Intervalos de actualización (en ms)
  REFRESH_INTERVALS: {
    CONTRACT_INFO: 30000, // 30 segundos
    BALANCE: 10000, // 10 segundos
    TOKENS: 60000, // 1 minuto
    AUDITOR: 30000, // 30 segundos
  },

  // Configuraciones de paginación
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },

  // Configuraciones de formato
  FORMAT: {
    ADDRESS_START_CHARS: 6,
    ADDRESS_END_CHARS: 4,
    TX_HASH_START_CHARS: 10,
    TX_HASH_END_CHARS: 8,
    DECIMAL_PLACES: 6,
  },
};

// Configuraciones de validación
export const VALIDATION_CONFIG = {
  // Límites de validación
  MAX_AMOUNT: BigInt("1000000000000000000000000"), // 1,000,000 tokens (18 decimales)
  MIN_AMOUNT: BigInt("1"), // 1 wei

  // Límites de arrays
  MAX_PUBLIC_SIGNALS: 100,
  MAX_AMOUNT_PCT_LENGTH: 7,

  // Límites de strings
  MAX_NAME_LENGTH: 50,
  MAX_SYMBOL_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 500,
};

// Configuraciones de errores
export const ERROR_MESSAGES = {
  // Errores de conexión
  NO_WALLET: "No wallet found. Please install MetaMask or another Web3 wallet.",
  WALLET_NOT_CONNECTED: "Wallet not connected. Please connect your wallet.",
  WRONG_NETWORK: "Wrong network. Please switch to the correct network.",

  // Errores de transacción
  TRANSACTION_FAILED: "Transaction failed. Please try again.",
  TRANSACTION_REVERTED: "Transaction reverted. Please check your inputs.",
  INSUFFICIENT_GAS: "Insufficient gas. Please increase gas limit.",
  INSUFFICIENT_BALANCE: "Insufficient balance for this transaction.",

  // Errores de validación
  INVALID_ADDRESS: "Invalid address format.",
  INVALID_AMOUNT: "Invalid amount. Please enter a valid number.",
  INVALID_PROOF: "Invalid proof. Please check your proof data.",
  INVALID_NULLIFIER: "Invalid nullifier. This nullifier has already been used.",

  // Errores del contrato
  USER_NOT_REGISTERED: "User not registered. Please register first.",
  AUDITOR_NOT_SET: "Auditor not set. Please set auditor first.",
  TOKEN_BLACKLISTED: "Token is blacklisted. Cannot perform this operation.",
  UNKNOWN_TOKEN: "Unknown token. Please check token address.",

  // Errores de red
  NETWORK_ERROR: "Network error. Please check your connection.",
  RPC_ERROR: "RPC error. Please try again later.",
  TIMEOUT_ERROR: "Request timeout. Please try again.",
};

// Configuraciones de logging
export const LOGGING_CONFIG = {
  // Niveles de log
  LOG_LEVELS: {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3,
  },

  // Nivel de log por defecto
  DEFAULT_LOG_LEVEL: 2, // INFO

  // Configuraciones de log
  ENABLE_CONSOLE_LOG: true,
  ENABLE_NETWORK_LOG: false,
  ENABLE_TRANSACTION_LOG: true,
  ENABLE_ERROR_LOG: true,
};

// Función para obtener la configuración completa
export const getFullConfig = (
  chainId?: number
): {
  contract: ContractConfig;
  network: any;
  gas: typeof GAS_CONFIG;
  ui: typeof UI_CONFIG;
  validation: typeof VALIDATION_CONFIG;
  errors: typeof ERROR_MESSAGES;
  logging: typeof LOGGING_CONFIG;
} => {
  const contractConfig = chainId
    ? ENV_CONFIG.getConfigByChainId(chainId)
    : ENV_CONFIG.getContractConfig();

  const networkInfo = ENV_CONFIG.getNetworkInfo(contractConfig.chainId);

  return {
    contract: contractConfig,
    network: networkInfo,
    gas: GAS_CONFIG,
    ui: UI_CONFIG,
    validation: VALIDATION_CONFIG,
    errors: ERROR_MESSAGES,
    logging: LOGGING_CONFIG,
  };
};
