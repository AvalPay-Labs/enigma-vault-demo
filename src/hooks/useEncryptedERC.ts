import { useState, useEffect, useCallback, useMemo } from "react";
import { ethers, BrowserProvider, JsonRpcProvider } from "ethers";
import { EncryptedERCService } from "../services/encryptedERCService";
import {
  ContractConfig,
  EncryptedBalance,
  BasicBalance,
  Point,
  TokenInfo,
  ContractInfo,
  DepositParams,
  WithdrawParams,
  TransferParams,
  PrivateMintParams,
  PrivateBurnParams,
} from "../types/encryptedERC";

interface UseEncryptedERCConfig {
  contractAddress: string;
  rpcUrl?: string;
  chainId?: number;
  autoConnect?: boolean;
}

interface UseEncryptedERCReturn {
  // Estado del servicio
  service: EncryptedERCService | null;
  provider: BrowserProvider | JsonRpcProvider | null;
  signer: ethers.Signer | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;

  // Funciones de conexión
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (chainId: number) => Promise<void>;

  // Funciones de consulta
  getContractInfo: () => Promise<ContractInfo | null>;
  getBalance: (
    user: string,
    tokenId: bigint
  ) => Promise<EncryptedBalance | null>;
  getBalanceStandalone: (user: string) => Promise<EncryptedBalance | null>;
  getBasicBalance: (
    user: string,
    tokenId: bigint
  ) => Promise<BasicBalance | null>;
  getBalanceFromTokenAddress: (
    user: string,
    tokenAddress: string
  ) => Promise<EncryptedBalance | null>;
  getTokenInfo: (tokenAddress: string) => Promise<TokenInfo | null>;
  getTokens: () => Promise<string[] | null>;
  getAuditor: () => Promise<string | null>;
  getAuditorPublicKey: () => Promise<Point | null>;
  isAuditorKeySet: () => Promise<boolean | null>;
  isTokenBlacklisted: (tokenAddress: string) => Promise<boolean | null>;
  alreadyMinted: (mintNullifier: bigint) => Promise<boolean | null>;

  // Funciones de transacción
  deposit: (
    params: DepositParams
  ) => Promise<ethers.ContractTransactionResponse | null>;
  withdraw: (
    params: WithdrawParams
  ) => Promise<ethers.ContractTransactionResponse | null>;
  transfer: (
    params: TransferParams
  ) => Promise<ethers.ContractTransactionResponse | null>;
  privateMint: (
    params: PrivateMintParams
  ) => Promise<ethers.ContractTransactionResponse | null>;
  privateBurn: (
    params: PrivateBurnParams
  ) => Promise<ethers.ContractTransactionResponse | null>;
  setAuditorPublicKey: (
    user: string
  ) => Promise<ethers.ContractTransactionResponse | null>;
  setTokenBlacklist: (
    token: string,
    blacklisted: boolean
  ) => Promise<ethers.ContractTransactionResponse | null>;

  // Utilidades
  getCurrentAccount: () => string | null;
  getNetworkInfo: () => Promise<{ chainId: number; name: string } | null>;
  waitForTransaction: (
    tx: ethers.ContractTransactionResponse
  ) => Promise<ethers.TransactionReceipt | null>;
}

export const useEncryptedERC = (
  config: UseEncryptedERCConfig
): UseEncryptedERCReturn => {
  const [service, setService] = useState<EncryptedERCService | null>(null);
  const [provider, setProvider] = useState<
    BrowserProvider | JsonRpcProvider | null
  >(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Configuración del contrato
  const contractConfig = useMemo(
    (): ContractConfig => ({
      contractAddress: config.contractAddress,
      rpcUrl: config.rpcUrl || "",
      chainId: config.chainId || 1,
    }),
    [config.contractAddress, config.rpcUrl, config.chainId]
  );

  // Inicializar provider
  useEffect(() => {
    const initializeProvider = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let newProvider: BrowserProvider | JsonRpcProvider;

        if (config.rpcUrl) {
          // Usar RPC personalizado
          newProvider = new JsonRpcProvider(config.rpcUrl);
        } else {
          // Usar wallet del navegador
          if (typeof window !== "undefined" && window.ethereum) {
            newProvider = new BrowserProvider(window.ethereum);
          } else {
            throw new Error(
              "No wallet found. Please install MetaMask or another Web3 wallet."
            );
          }
        }

        setProvider(newProvider);

        // Crear servicio
        const newService = new EncryptedERCService(contractConfig, newProvider);
        setService(newService);

        // Auto-conectar si está habilitado
        if (config.autoConnect && !config.rpcUrl) {
          await connectWallet();
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to initialize provider"
        );
      } finally {
        setIsLoading(false);
      }
    };

    initializeProvider();
  }, [contractConfig, config.autoConnect, config.rpcUrl]);

  // Conectar wallet
  const connectWallet = useCallback(async () => {
    if (!provider || !window.ethereum) {
      setError("No wallet found");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Solicitar acceso a la cuenta
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Obtener signer
      const newSigner = await (provider as BrowserProvider).getSigner();
      setSigner(newSigner);
      setIsConnected(true);

      // Actualizar servicio con signer
      if (service) {
        const updatedService = new EncryptedERCService(
          contractConfig,
          provider,
          newSigner
        );
        setService(updatedService);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [provider, service, contractConfig]);

  // Desconectar wallet
  const disconnectWallet = useCallback(() => {
    setSigner(null);
    setIsConnected(false);
    if (service) {
      const updatedService = new EncryptedERCService(
        contractConfig,
        provider!,
        undefined
      );
      setService(updatedService);
    }
  }, [service, contractConfig, provider]);

  // Cambiar red
  const switchNetwork = useCallback(async (chainId: number) => {
    if (!window.ethereum) {
      setError("No wallet found");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to switch network");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Funciones de consulta
  const getContractInfo =
    useCallback(async (): Promise<ContractInfo | null> => {
      if (!service) return null;
      try {
        return await service.getContractInfo();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to get contract info"
        );
        return null;
      }
    }, [service]);

  const getBalance = useCallback(
    async (user: string, tokenId: bigint): Promise<EncryptedBalance | null> => {
      if (!service) return null;
      try {
        return await service.getBalance(user, tokenId);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to get balance");
        return null;
      }
    },
    [service]
  );

  const getBalanceStandalone = useCallback(
    async (user: string): Promise<EncryptedBalance | null> => {
      if (!service) return null;
      try {
        return await service.getBalanceStandalone(user);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to get standalone balance"
        );
        return null;
      }
    },
    [service]
  );

  const getBasicBalance = useCallback(
    async (user: string, tokenId: bigint): Promise<BasicBalance | null> => {
      if (!service) return null;
      try {
        return await service.getBasicBalance(user, tokenId);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to get basic balance"
        );
        return null;
      }
    },
    [service]
  );

  const getBalanceFromTokenAddress = useCallback(
    async (
      user: string,
      tokenAddress: string
    ): Promise<EncryptedBalance | null> => {
      if (!service) return null;
      try {
        return await service.getBalanceFromTokenAddress(user, tokenAddress);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to get balance from token address"
        );
        return null;
      }
    },
    [service]
  );

  const getTokenInfo = useCallback(
    async (tokenAddress: string): Promise<TokenInfo | null> => {
      if (!service) return null;
      try {
        return await service.getTokenInfo(tokenAddress);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to get token info"
        );
        return null;
      }
    },
    [service]
  );

  const getTokens = useCallback(async (): Promise<string[] | null> => {
    if (!service) return null;
    try {
      return await service.getTokens();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get tokens");
      return null;
    }
  }, [service]);

  const getAuditor = useCallback(async (): Promise<string | null> => {
    if (!service) return null;
    try {
      return await service.getAuditor();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get auditor");
      return null;
    }
  }, [service]);

  const getAuditorPublicKey = useCallback(async (): Promise<Point | null> => {
    if (!service) return null;
    try {
      return await service.getAuditorPublicKey();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to get auditor public key"
      );
      return null;
    }
  }, [service]);

  const isAuditorKeySet = useCallback(async (): Promise<boolean | null> => {
    if (!service) return null;
    try {
      return await service.isAuditorKeySet();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to check auditor key"
      );
      return null;
    }
  }, [service]);

  const isTokenBlacklisted = useCallback(
    async (tokenAddress: string): Promise<boolean | null> => {
      if (!service) return null;
      try {
        return await service.isTokenBlacklisted(tokenAddress);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to check token blacklist"
        );
        return null;
      }
    },
    [service]
  );

  const alreadyMinted = useCallback(
    async (mintNullifier: bigint): Promise<boolean | null> => {
      if (!service) return null;
      try {
        return await service.alreadyMinted(mintNullifier);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to check mint nullifier"
        );
        return null;
      }
    },
    [service]
  );

  // Funciones de transacción
  const deposit = useCallback(
    async (
      params: DepositParams
    ): Promise<ethers.ContractTransactionResponse | null> => {
      if (!service) return null;
      try {
        return await service.deposit(params);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to deposit");
        return null;
      }
    },
    [service]
  );

  const withdraw = useCallback(
    async (
      params: WithdrawParams
    ): Promise<ethers.ContractTransactionResponse | null> => {
      if (!service) return null;
      try {
        return await service.withdraw(params);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to withdraw");
        return null;
      }
    },
    [service]
  );

  const transfer = useCallback(
    async (
      params: TransferParams
    ): Promise<ethers.ContractTransactionResponse | null> => {
      if (!service) return null;
      try {
        return await service.transfer(params);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to transfer");
        return null;
      }
    },
    [service]
  );

  const privateMint = useCallback(
    async (
      params: PrivateMintParams
    ): Promise<ethers.ContractTransactionResponse | null> => {
      if (!service) return null;
      try {
        return await service.privateMint(params);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to private mint");
        return null;
      }
    },
    [service]
  );

  const privateBurn = useCallback(
    async (
      params: PrivateBurnParams
    ): Promise<ethers.ContractTransactionResponse | null> => {
      if (!service) return null;
      try {
        return await service.privateBurn(params);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to private burn");
        return null;
      }
    },
    [service]
  );

  const setAuditorPublicKey = useCallback(
    async (
      user: string
    ): Promise<ethers.ContractTransactionResponse | null> => {
      if (!service) return null;
      try {
        return await service.setAuditorPublicKey(user);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to set auditor public key"
        );
        return null;
      }
    },
    [service]
  );

  const setTokenBlacklist = useCallback(
    async (
      token: string,
      blacklisted: boolean
    ): Promise<ethers.ContractTransactionResponse | null> => {
      if (!service) return null;
      try {
        return await service.setTokenBlacklist(token, blacklisted);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to set token blacklist"
        );
        return null;
      }
    },
    [service]
  );

  // Utilidades
  const getCurrentAccount = useCallback((): string | null => {
    if (!signer) return null;
    // El signer no expone directamente la dirección, necesitaríamos obtenerla de otra manera
    return null;
  }, [signer]);

  const getNetworkInfo = useCallback(async (): Promise<{
    chainId: number;
    name: string;
  } | null> => {
    if (!provider) return null;
    try {
      const network = await provider.getNetwork();
      return {
        chainId: Number(network.chainId),
        name: network.name,
      };
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to get network info"
      );
      return null;
    }
  }, [provider]);

  const waitForTransaction = useCallback(
    async (
      tx: ethers.ContractTransactionResponse
    ): Promise<ethers.TransactionReceipt | null> => {
      if (!service) return null;
      try {
        return await service.waitForTransaction(tx);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to wait for transaction"
        );
        return null;
      }
    },
    [service]
  );

  return {
    // Estado del servicio
    service,
    provider,
    signer,
    isConnected,
    isLoading,
    error,

    // Funciones de conexión
    connectWallet,
    disconnectWallet,
    switchNetwork,

    // Funciones de consulta
    getContractInfo,
    getBalance,
    getBalanceStandalone,
    getBasicBalance,
    getBalanceFromTokenAddress,
    getTokenInfo,
    getTokens,
    getAuditor,
    getAuditorPublicKey,
    isAuditorKeySet,
    isTokenBlacklisted,
    alreadyMinted,

    // Funciones de transacción
    deposit,
    withdraw,
    transfer,
    privateMint,
    privateBurn,
    setAuditorPublicKey,
    setTokenBlacklist,

    // Utilidades
    getCurrentAccount,
    getNetworkInfo,
    waitForTransaction,
  };
};
