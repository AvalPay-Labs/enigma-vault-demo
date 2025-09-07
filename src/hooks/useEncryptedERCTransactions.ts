import { useState, useCallback } from "react";
import { ethers } from "ethers";
import { useEncryptedERC } from "./useEncryptedERC";
import {
  DepositParams,
  WithdrawParams,
  TransferParams,
  PrivateMintParams,
  PrivateBurnParams,
} from "../types/encryptedERC";

interface UseEncryptedERCTransactionsConfig {
  contractAddress: string;
  rpcUrl?: string;
  chainId?: number;
  autoConnect?: boolean;
}

interface TransactionState {
  isLoading: boolean;
  error: string | null;
  txHash: string | null;
  receipt: ethers.TransactionReceipt | null;
}

interface UseEncryptedERCTransactionsReturn {
  // Estado de las transacciones
  depositState: TransactionState;
  withdrawState: TransactionState;
  transferState: TransactionState;
  privateMintState: TransactionState;
  privateBurnState: TransactionState;
  setAuditorPublicKeyState: TransactionState;
  setTokenBlacklistState: TransactionState;

  // Funciones de transacción
  deposit: (params: DepositParams) => Promise<boolean>;
  withdraw: (params: WithdrawParams) => Promise<boolean>;
  transfer: (params: TransferParams) => Promise<boolean>;
  privateMint: (params: PrivateMintParams) => Promise<boolean>;
  privateBurn: (params: PrivateBurnParams) => Promise<boolean>;
  setAuditorPublicKey: (user: string) => Promise<boolean>;
  setTokenBlacklist: (token: string, blacklisted: boolean) => Promise<boolean>;

  // Utilidades
  clearError: (
    transactionType: keyof UseEncryptedERCTransactionsReturn
  ) => void;
  clearAllErrors: () => void;
  resetTransactionState: (
    transactionType: keyof UseEncryptedERCTransactionsReturn
  ) => void;
  resetAllTransactionStates: () => void;
}

export const useEncryptedERCTransactions = (
  config: UseEncryptedERCTransactionsConfig
): UseEncryptedERCTransactionsReturn => {
  const {
    service,
    isConnected,
    deposit: executeDeposit,
    withdraw: executeWithdraw,
    transfer: executeTransfer,
    privateMint: executePrivateMint,
    privateBurn: executePrivateBurn,
    setAuditorPublicKey: executeSetAuditorPublicKey,
    setTokenBlacklist: executeSetTokenBlacklist,
    waitForTransaction,
  } = useEncryptedERC(config);

  // Estado de las transacciones
  const [depositState, setDepositState] = useState<TransactionState>({
    isLoading: false,
    error: null,
    txHash: null,
    receipt: null,
  });

  const [withdrawState, setWithdrawState] = useState<TransactionState>({
    isLoading: false,
    error: null,
    txHash: null,
    receipt: null,
  });

  const [transferState, setTransferState] = useState<TransactionState>({
    isLoading: false,
    error: null,
    txHash: null,
    receipt: null,
  });

  const [privateMintState, setPrivateMintState] = useState<TransactionState>({
    isLoading: false,
    error: null,
    txHash: null,
    receipt: null,
  });

  const [privateBurnState, setPrivateBurnState] = useState<TransactionState>({
    isLoading: false,
    error: null,
    txHash: null,
    receipt: null,
  });

  const [setAuditorPublicKeyState, setSetAuditorPublicKeyState] =
    useState<TransactionState>({
      isLoading: false,
      error: null,
      txHash: null,
      receipt: null,
    });

  const [setTokenBlacklistState, setSetTokenBlacklistState] =
    useState<TransactionState>({
      isLoading: false,
      error: null,
      txHash: null,
      receipt: null,
    });

  // Función genérica para ejecutar transacciones
  const executeTransaction = useCallback(
    async <T extends TransactionState>(
      transactionFunction: () => Promise<ethers.ContractTransactionResponse | null>,
      setState: React.Dispatch<React.SetStateAction<T>>,
      transactionName: string
    ): Promise<boolean> => {
      if (!service || !isConnected) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Service not connected or wallet not connected",
        }));
        return false;
      }

      try {
        // Iniciar transacción
        setState((prev) => ({
          ...prev,
          isLoading: true,
          error: null,
          txHash: null,
          receipt: null,
        }));

        // Ejecutar transacción
        const tx = await transactionFunction();
        if (!tx) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: "Transaction failed to execute",
          }));
          return false;
        }

        // Actualizar con hash de transacción
        setState((prev) => ({
          ...prev,
          txHash: tx.hash,
        }));

        // Esperar confirmación
        const receipt = await waitForTransaction(tx);
        if (!receipt) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: "Transaction failed to confirm",
          }));
          return false;
        }

        // Verificar si la transacción fue exitosa
        if (receipt.status === 0) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: "Transaction reverted",
          }));
          return false;
        }

        // Transacción exitosa
        setState((prev) => ({
          ...prev,
          isLoading: false,
          receipt,
        }));

        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : `Failed to execute ${transactionName}`;
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        return false;
      }
    },
    [service, isConnected, waitForTransaction]
  );

  // Funciones de transacción
  const deposit = useCallback(
    async (params: DepositParams): Promise<boolean> => {
      return executeTransaction(
        () => executeDeposit(params),
        setDepositState,
        "deposit"
      );
    },
    [executeDeposit, executeTransaction]
  );

  const withdraw = useCallback(
    async (params: WithdrawParams): Promise<boolean> => {
      return executeTransaction(
        () => executeWithdraw(params),
        setWithdrawState,
        "withdraw"
      );
    },
    [executeWithdraw, executeTransaction]
  );

  const transfer = useCallback(
    async (params: TransferParams): Promise<boolean> => {
      return executeTransaction(
        () => executeTransfer(params),
        setTransferState,
        "transfer"
      );
    },
    [executeTransfer, executeTransaction]
  );

  const privateMint = useCallback(
    async (params: PrivateMintParams): Promise<boolean> => {
      return executeTransaction(
        () => executePrivateMint(params),
        setPrivateMintState,
        "privateMint"
      );
    },
    [executePrivateMint, executeTransaction]
  );

  const privateBurn = useCallback(
    async (params: PrivateBurnParams): Promise<boolean> => {
      return executeTransaction(
        () => executePrivateBurn(params),
        setPrivateBurnState,
        "privateBurn"
      );
    },
    [executePrivateBurn, executeTransaction]
  );

  const setAuditorPublicKey = useCallback(
    async (user: string): Promise<boolean> => {
      return executeTransaction(
        () => executeSetAuditorPublicKey(user),
        setSetAuditorPublicKeyState,
        "setAuditorPublicKey"
      );
    },
    [executeSetAuditorPublicKey, executeTransaction]
  );

  const setTokenBlacklist = useCallback(
    async (token: string, blacklisted: boolean): Promise<boolean> => {
      return executeTransaction(
        () => executeSetTokenBlacklist(token, blacklisted),
        setSetTokenBlacklistState,
        "setTokenBlacklist"
      );
    },
    [executeSetTokenBlacklist, executeTransaction]
  );

  // Utilidades
  const clearError = useCallback(
    (transactionType: keyof UseEncryptedERCTransactionsReturn) => {
      switch (transactionType) {
        case "depositState":
          setDepositState((prev) => ({ ...prev, error: null }));
          break;
        case "withdrawState":
          setWithdrawState((prev) => ({ ...prev, error: null }));
          break;
        case "transferState":
          setTransferState((prev) => ({ ...prev, error: null }));
          break;
        case "privateMintState":
          setPrivateMintState((prev) => ({ ...prev, error: null }));
          break;
        case "privateBurnState":
          setPrivateBurnState((prev) => ({ ...prev, error: null }));
          break;
        case "setAuditorPublicKeyState":
          setSetAuditorPublicKeyState((prev) => ({ ...prev, error: null }));
          break;
        case "setTokenBlacklistState":
          setSetTokenBlacklistState((prev) => ({ ...prev, error: null }));
          break;
      }
    },
    []
  );

  const clearAllErrors = useCallback(() => {
    setDepositState((prev) => ({ ...prev, error: null }));
    setWithdrawState((prev) => ({ ...prev, error: null }));
    setTransferState((prev) => ({ ...prev, error: null }));
    setPrivateMintState((prev) => ({ ...prev, error: null }));
    setPrivateBurnState((prev) => ({ ...prev, error: null }));
    setSetAuditorPublicKeyState((prev) => ({ ...prev, error: null }));
    setSetTokenBlacklistState((prev) => ({ ...prev, error: null }));
  }, []);

  const resetTransactionState = useCallback(
    (transactionType: keyof UseEncryptedERCTransactionsReturn) => {
      const resetState: TransactionState = {
        isLoading: false,
        error: null,
        txHash: null,
        receipt: null,
      };

      switch (transactionType) {
        case "depositState":
          setDepositState(resetState);
          break;
        case "withdrawState":
          setWithdrawState(resetState);
          break;
        case "transferState":
          setTransferState(resetState);
          break;
        case "privateMintState":
          setPrivateMintState(resetState);
          break;
        case "privateBurnState":
          setPrivateBurnState(resetState);
          break;
        case "setAuditorPublicKeyState":
          setSetAuditorPublicKeyState(resetState);
          break;
        case "setTokenBlacklistState":
          setSetTokenBlacklistState(resetState);
          break;
      }
    },
    []
  );

  const resetAllTransactionStates = useCallback(() => {
    const resetState: TransactionState = {
      isLoading: false,
      error: null,
      txHash: null,
      receipt: null,
    };

    setDepositState(resetState);
    setWithdrawState(resetState);
    setTransferState(resetState);
    setPrivateMintState(resetState);
    setPrivateBurnState(resetState);
    setSetAuditorPublicKeyState(resetState);
    setSetTokenBlacklistState(resetState);
  }, []);

  return {
    // Estado de las transacciones
    depositState,
    withdrawState,
    transferState,
    privateMintState,
    privateBurnState,
    setAuditorPublicKeyState,
    setTokenBlacklistState,

    // Funciones de transacción
    deposit,
    withdraw,
    transfer,
    privateMint,
    privateBurn,
    setAuditorPublicKey,
    setTokenBlacklist,

    // Utilidades
    clearError,
    clearAllErrors,
    resetTransactionState,
    resetAllTransactionStates,
  };
};
