import { useState, useEffect, useCallback } from "react";
import { useEncryptedERC } from "./useEncryptedERC";
import {
  EncryptedBalance,
  BasicBalance,
  Point,
  TokenInfo,
  ContractInfo,
} from "../types/encryptedERC";

interface UseEncryptedERCQueriesConfig {
  contractAddress: string;
  rpcUrl?: string;
  chainId?: number;
  autoConnect?: boolean;
  refreshInterval?: number;
}

interface UseEncryptedERCQueriesReturn {
  // Estado de carga
  isLoading: boolean;
  error: string | null;

  // Datos del contrato
  contractInfo: ContractInfo | null;
  auditor: string | null;
  auditorPublicKey: Point | null;
  isAuditorKeySet: boolean | null;
  tokens: string[] | null;

  // Funciones de consulta con estado
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
  isTokenBlacklisted: (tokenAddress: string) => Promise<boolean | null>;
  alreadyMinted: (mintNullifier: bigint) => Promise<boolean | null>;

  // Funciones de actualización
  refreshContractInfo: () => Promise<void>;
  refreshAuditor: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  refreshAll: () => Promise<void>;
}

export const useEncryptedERCQueries = (
  config: UseEncryptedERCQueriesConfig
): UseEncryptedERCQueriesReturn => {
  const {
    service,
    isConnected,
    isLoading: serviceLoading,
    error: serviceError,
    getContractInfo,
    getAuditor,
    getAuditorPublicKey,
    isAuditorKeySet: checkAuditorKeySet,
    getTokens,
    getBalance: queryBalance,
    getBalanceStandalone: queryBalanceStandalone,
    getBasicBalance: queryBasicBalance,
    getBalanceFromTokenAddress: queryBalanceFromTokenAddress,
    getTokenInfo: queryTokenInfo,
    isTokenBlacklisted: queryIsTokenBlacklisted,
    alreadyMinted: queryAlreadyMinted,
  } = useEncryptedERC(config);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estado de los datos
  const [contractInfo, setContractInfo] = useState<ContractInfo | null>(null);
  const [auditor, setAuditor] = useState<string | null>(null);
  const [auditorPublicKey, setAuditorPublicKey] = useState<Point | null>(null);
  const [isAuditorKeySet, setIsAuditorKeySet] = useState<boolean | null>(null);
  const [tokens, setTokens] = useState<string[] | null>(null);

  // Función para manejar errores
  const handleError = useCallback((err: string) => {
    setError(err);
    console.error("EncryptedERC Query Error:", err);
  }, []);

  // Función para limpiar errores
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Cargar información del contrato
  const loadContractInfo = useCallback(async () => {
    if (!service || !isConnected) return;

    try {
      setIsLoading(true);
      clearError();

      const info = await getContractInfo();
      if (info) {
        setContractInfo(info);
      }
    } catch (err) {
      handleError(
        err instanceof Error ? err.message : "Failed to load contract info"
      );
    } finally {
      setIsLoading(false);
    }
  }, [service, isConnected, getContractInfo, handleError, clearError]);

  // Cargar información del auditor
  const loadAuditorInfo = useCallback(async () => {
    if (!service || !isConnected) return;

    try {
      setIsLoading(true);
      clearError();

      const [auditorAddress, publicKey, keySet] = await Promise.all([
        getAuditor(),
        getAuditorPublicKey(),
        checkAuditorKeySet(),
      ]);

      if (auditorAddress) setAuditor(auditorAddress);
      if (publicKey) setAuditorPublicKey(publicKey);
      if (keySet !== null) setIsAuditorKeySet(keySet);
    } catch (err) {
      handleError(
        err instanceof Error ? err.message : "Failed to load auditor info"
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    service,
    isConnected,
    getAuditor,
    getAuditorPublicKey,
    checkAuditorKeySet,
    handleError,
    clearError,
  ]);

  // Cargar tokens
  const loadTokens = useCallback(async () => {
    if (!service || !isConnected) return;

    try {
      setIsLoading(true);
      clearError();

      const tokenList = await getTokens();
      if (tokenList) {
        setTokens(tokenList);
      }
    } catch (err) {
      handleError(err instanceof Error ? err.message : "Failed to load tokens");
    } finally {
      setIsLoading(false);
    }
  }, [service, isConnected, getTokens, handleError, clearError]);

  // Cargar toda la información
  const loadAll = useCallback(async () => {
    if (!service || !isConnected) return;

    try {
      setIsLoading(true);
      clearError();

      await Promise.all([loadContractInfo(), loadAuditorInfo(), loadTokens()]);
    } catch (err) {
      handleError(
        err instanceof Error ? err.message : "Failed to load all data"
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    service,
    isConnected,
    loadContractInfo,
    loadAuditorInfo,
    loadTokens,
    handleError,
    clearError,
  ]);

  // Cargar datos cuando se conecta
  useEffect(() => {
    if (isConnected && service) {
      loadAll();
    }
  }, [isConnected, service, loadAll]);

  // Configurar intervalo de actualización
  useEffect(() => {
    if (!config.refreshInterval || !isConnected) return;

    const interval = setInterval(() => {
      loadAll();
    }, config.refreshInterval);

    return () => clearInterval(interval);
  }, [config.refreshInterval, isConnected, loadAll]);

  // Funciones de consulta con manejo de errores
  const getBalance = useCallback(
    async (user: string, tokenId: bigint): Promise<EncryptedBalance | null> => {
      try {
        clearError();
        return await queryBalance(user, tokenId);
      } catch (err) {
        handleError(
          err instanceof Error ? err.message : "Failed to get balance"
        );
        return null;
      }
    },
    [queryBalance, handleError, clearError]
  );

  const getBalanceStandalone = useCallback(
    async (user: string): Promise<EncryptedBalance | null> => {
      try {
        clearError();
        return await queryBalanceStandalone(user);
      } catch (err) {
        handleError(
          err instanceof Error
            ? err.message
            : "Failed to get standalone balance"
        );
        return null;
      }
    },
    [queryBalanceStandalone, handleError, clearError]
  );

  const getBasicBalance = useCallback(
    async (user: string, tokenId: bigint): Promise<BasicBalance | null> => {
      try {
        clearError();
        return await queryBasicBalance(user, tokenId);
      } catch (err) {
        handleError(
          err instanceof Error ? err.message : "Failed to get basic balance"
        );
        return null;
      }
    },
    [queryBasicBalance, handleError, clearError]
  );

  const getBalanceFromTokenAddress = useCallback(
    async (
      user: string,
      tokenAddress: string
    ): Promise<EncryptedBalance | null> => {
      try {
        clearError();
        return await queryBalanceFromTokenAddress(user, tokenAddress);
      } catch (err) {
        handleError(
          err instanceof Error
            ? err.message
            : "Failed to get balance from token address"
        );
        return null;
      }
    },
    [queryBalanceFromTokenAddress, handleError, clearError]
  );

  const getTokenInfo = useCallback(
    async (tokenAddress: string): Promise<TokenInfo | null> => {
      try {
        clearError();
        return await queryTokenInfo(tokenAddress);
      } catch (err) {
        handleError(
          err instanceof Error ? err.message : "Failed to get token info"
        );
        return null;
      }
    },
    [queryTokenInfo, handleError, clearError]
  );

  const isTokenBlacklisted = useCallback(
    async (tokenAddress: string): Promise<boolean | null> => {
      try {
        clearError();
        return await queryIsTokenBlacklisted(tokenAddress);
      } catch (err) {
        handleError(
          err instanceof Error ? err.message : "Failed to check token blacklist"
        );
        return null;
      }
    },
    [queryIsTokenBlacklisted, handleError, clearError]
  );

  const alreadyMinted = useCallback(
    async (mintNullifier: bigint): Promise<boolean | null> => {
      try {
        clearError();
        return await queryAlreadyMinted(mintNullifier);
      } catch (err) {
        handleError(
          err instanceof Error ? err.message : "Failed to check mint nullifier"
        );
        return null;
      }
    },
    [queryAlreadyMinted, handleError, clearError]
  );

  // Funciones de actualización
  const refreshContractInfo = useCallback(async () => {
    await loadContractInfo();
  }, [loadContractInfo]);

  const refreshAuditor = useCallback(async () => {
    await loadAuditorInfo();
  }, [loadAuditorInfo]);

  const refreshTokens = useCallback(async () => {
    await loadTokens();
  }, [loadTokens]);

  const refreshAll = useCallback(async () => {
    await loadAll();
  }, [loadAll]);

  return {
    // Estado de carga
    isLoading: isLoading || serviceLoading,
    error: error || serviceError,

    // Datos del contrato
    contractInfo,
    auditor,
    auditorPublicKey,
    isAuditorKeySet,
    tokens,

    // Funciones de consulta con estado
    getBalance,
    getBalanceStandalone,
    getBasicBalance,
    getBalanceFromTokenAddress,
    getTokenInfo,
    isTokenBlacklisted,
    alreadyMinted,

    // Funciones de actualización
    refreshContractInfo,
    refreshAuditor,
    refreshTokens,
    refreshAll,
  };
};
