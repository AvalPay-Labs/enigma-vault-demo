import React, { useState, useEffect } from "react";
import { useEncryptedERC } from "../hooks/useEncryptedERC";
import { useEncryptedERCQueries } from "../hooks/useEncryptedERCQueries";
import { useEncryptedERCTransactions } from "../hooks/useEncryptedERCTransactions";
import { EncryptedERCUtils } from "../utils/encryptedERCUtils";
import { getFullConfig } from "../config/encryptedERCConfig";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

/**
 * Componente de ejemplo que demuestra cómo usar el contrato EncryptedERC
 */
export const EncryptedERCExample: React.FC = () => {
  const [userAddress, setUserAddress] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [tokenId, setTokenId] = useState("");

  // Configuración del contrato
  const config = getFullConfig();
  const contractConfig = config.contract;

  // Hooks principales
  const {
    isConnected,
    isLoading: connectionLoading,
    error: connectionError,
    connectWallet,
    disconnectWallet,
    getNetworkInfo,
  } = useEncryptedERC({
    contractAddress: contractConfig.contractAddress,
    rpcUrl: contractConfig.rpcUrl,
    chainId: contractConfig.chainId,
    autoConnect: false,
  });

  const {
    isLoading: queriesLoading,
    error: queriesError,
    contractInfo,
    auditor,
    auditorPublicKey,
    isAuditorKeySet,
    tokens,
    getBalance,
    getBalanceStandalone,
    getTokenInfo,
    refreshAll,
  } = useEncryptedERCQueries({
    contractAddress: contractConfig.contractAddress,
    rpcUrl: contractConfig.rpcUrl,
    chainId: contractConfig.chainId,
    autoConnect: false,
    refreshInterval: 30000,
  });

  const {
    depositState,
    withdrawState,
    transferState,
    deposit,
    withdraw,
    transfer,
    clearAllErrors,
  } = useEncryptedERCTransactions({
    contractAddress: contractConfig.contractAddress,
    rpcUrl: contractConfig.rpcUrl,
    chainId: contractConfig.chainId,
    autoConnect: false,
  });

  // Estado local
  const [balance, setBalance] = useState<any>(null);
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [networkInfo, setNetworkInfo] = useState<any>(null);

  // Cargar información de red
  useEffect(() => {
    const loadNetworkInfo = async () => {
      const info = await getNetworkInfo();
      setNetworkInfo(info);
    };
    loadNetworkInfo();
  }, [getNetworkInfo]);

  // Funciones de ejemplo
  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleDisconnectWallet = () => {
    disconnectWallet();
  };

  const handleGetBalance = async () => {
    if (!userAddress || !tokenId) return;

    try {
      const balanceData = await getBalance(userAddress, BigInt(tokenId));
      setBalance(balanceData);
    } catch (error) {
      console.error("Error getting balance:", error);
    }
  };

  const handleGetBalanceStandalone = async () => {
    if (!userAddress) return;

    try {
      const balanceData = await getBalanceStandalone(userAddress);
      setBalance(balanceData);
    } catch (error) {
      console.error("Error getting standalone balance:", error);
    }
  };

  const handleGetTokenInfo = async () => {
    if (!tokenAddress) return;

    try {
      const info = await getTokenInfo(tokenAddress);
      setTokenInfo(info);
    } catch (error) {
      console.error("Error getting token info:", error);
    }
  };

  const handleDeposit = async () => {
    if (!amount || !tokenAddress) return;

    try {
      const amountBigInt = EncryptedERCUtils.parseBigInt(amount);
      const amountPCT = [
        BigInt(0),
        BigInt(0),
        BigInt(0),
        BigInt(0),
        BigInt(0),
        BigInt(0),
        BigInt(0),
      ]; // Ejemplo

      const success = await deposit({
        amount: amountBigInt,
        tokenAddress,
        amountPCT,
      });

      if (success) {
        console.log("Deposit successful");
        // Refrescar datos
        await refreshAll();
      }
    } catch (error) {
      console.error("Error depositing:", error);
    }
  };

  const handleWithdraw = async () => {
    if (!tokenId) return;

    try {
      // Crear prueba de ejemplo (en producción, esto vendría del backend)
      const proof = {
        proofPoints: {
          a: [BigInt(0), BigInt(0)],
          b: [
            [BigInt(0), BigInt(0)],
            [BigInt(0), BigInt(0)],
          ],
          c: [BigInt(0), BigInt(0)],
        },
        publicSignals: [
          BigInt(0),
          BigInt(0),
          BigInt(0),
          BigInt(0),
          BigInt(0),
          BigInt(0),
          BigInt(0),
          BigInt(0),
          BigInt(0),
          BigInt(0),
          BigInt(0),
          BigInt(0),
          BigInt(0),
          BigInt(0),
          BigInt(0),
          BigInt(0),
        ],
      };

      const balancePCT = [
        BigInt(0),
        BigInt(0),
        BigInt(0),
        BigInt(0),
        BigInt(0),
        BigInt(0),
        BigInt(0),
      ]; // Ejemplo

      const success = await withdraw({
        tokenId: BigInt(tokenId),
        proof,
        balancePCT,
      });

      if (success) {
        console.log("Withdraw successful");
        // Refrescar datos
        await refreshAll();
      }
    } catch (error) {
      console.error("Error withdrawing:", error);
    }
  };

  const handleClearErrors = () => {
    clearAllErrors();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">
          EncryptedERC Contract Example
        </h1>
        <p className="text-gray-600">
          Ejemplo de uso del contrato EncryptedERC con Web3
        </p>
      </div>

      {/* Información de conexión */}
      <Card>
        <CardHeader>
          <CardTitle>Estado de Conexión</CardTitle>
          <CardDescription>
            Información sobre la conexión a la red y wallet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Estado:</span>
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? "Conectado" : "Desconectado"}
            </Badge>
          </div>

          {networkInfo && (
            <div className="flex items-center justify-between">
              <span>Red:</span>
              <Badge variant="outline">{networkInfo.name}</Badge>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span>Chain ID:</span>
            <Badge variant="outline">{contractConfig.chainId}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span>Contrato:</span>
            <Badge variant="outline">
              {EncryptedERCUtils.formatAddress(contractConfig.contractAddress)}
            </Badge>
          </div>

          <div className="flex gap-2">
            {!isConnected ? (
              <Button
                onClick={handleConnectWallet}
                disabled={connectionLoading}
              >
                {connectionLoading ? "Conectando..." : "Conectar Wallet"}
              </Button>
            ) : (
              <Button onClick={handleDisconnectWallet} variant="outline">
                Desconectar
              </Button>
            )}
          </div>

          {connectionError && (
            <Alert variant="destructive">
              <AlertDescription>{connectionError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Información del contrato */}
      {contractInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Información del Contrato</CardTitle>
            <CardDescription>
              Detalles del contrato EncryptedERC
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nombre:</Label>
                <p className="font-mono">{contractInfo.name}</p>
              </div>
              <div>
                <Label>Símbolo:</Label>
                <p className="font-mono">{contractInfo.symbol}</p>
              </div>
              <div>
                <Label>Decimales:</Label>
                <p className="font-mono">{contractInfo.decimals.toString()}</p>
              </div>
              <div>
                <Label>Modo:</Label>
                <Badge
                  variant={contractInfo.isConverter ? "default" : "secondary"}
                >
                  {contractInfo.isConverter ? "Converter" : "Standalone"}
                </Badge>
              </div>
              <div>
                <Label>Auditor:</Label>
                <p className="font-mono text-sm">
                  {EncryptedERCUtils.formatAddress(contractInfo.auditor)}
                </p>
              </div>
              <div>
                <Label>Clave del Auditor:</Label>
                <Badge
                  variant={
                    contractInfo.isAuditorKeySet ? "default" : "secondary"
                  }
                >
                  {contractInfo.isAuditorKeySet
                    ? "Configurada"
                    : "No configurada"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Consultas */}
      <Card>
        <CardHeader>
          <CardTitle>Consultas</CardTitle>
          <CardDescription>Funciones de consulta del contrato</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userAddress">Dirección del Usuario</Label>
              <Input
                id="userAddress"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                placeholder="0x..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tokenId">Token ID</Label>
              <Input
                id="tokenId"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tokenAddress">Dirección del Token</Label>
            <Input
              id="tokenAddress"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="0x..."
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={handleGetBalance}
              disabled={!userAddress || !tokenId}
            >
              Obtener Balance
            </Button>
            <Button
              onClick={handleGetBalanceStandalone}
              disabled={!userAddress}
            >
              Balance Standalone
            </Button>
            <Button onClick={handleGetTokenInfo} disabled={!tokenAddress}>
              Info del Token
            </Button>
            <Button onClick={refreshAll} disabled={queriesLoading}>
              {queriesLoading ? "Actualizando..." : "Actualizar Todo"}
            </Button>
          </div>

          {queriesError && (
            <Alert variant="destructive">
              <AlertDescription>{queriesError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Resultados de consultas */}
      {(balance || tokenInfo) && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
            <CardDescription>
              Resultados de las consultas realizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {balance && (
              <div>
                <h4 className="font-semibold mb-2">Balance:</h4>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                  {JSON.stringify(
                    balance,
                    (key, value) =>
                      typeof value === "bigint" ? value.toString() : value,
                    2
                  )}
                </pre>
              </div>
            )}

            {tokenInfo && (
              <div>
                <h4 className="font-semibold mb-2">Información del Token:</h4>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                  {JSON.stringify(
                    tokenInfo,
                    (key, value) =>
                      typeof value === "bigint" ? value.toString() : value,
                    2
                  )}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Transacciones */}
      <Card>
        <CardHeader>
          <CardTitle>Transacciones</CardTitle>
          <CardDescription>
            Funciones de transacción del contrato
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Cantidad</Label>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1000000000000000000"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={handleDeposit}
              disabled={!amount || !tokenAddress || !isConnected}
            >
              Depositar
            </Button>
            <Button
              onClick={handleWithdraw}
              disabled={!tokenId || !isConnected}
            >
              Retirar
            </Button>
            <Button onClick={handleClearErrors} variant="outline">
              Limpiar Errores
            </Button>
          </div>

          {/* Estados de transacciones */}
          <div className="space-y-2">
            {depositState.isLoading && (
              <Alert>
                <AlertDescription>
                  Depositando... Hash:{" "}
                  {depositState.txHash &&
                    EncryptedERCUtils.formatTxHash(depositState.txHash)}
                </AlertDescription>
              </Alert>
            )}
            {depositState.error && (
              <Alert variant="destructive">
                <AlertDescription>
                  Error en depósito: {depositState.error}
                </AlertDescription>
              </Alert>
            )}

            {withdrawState.isLoading && (
              <Alert>
                <AlertDescription>
                  Retirando... Hash:{" "}
                  {withdrawState.txHash &&
                    EncryptedERCUtils.formatTxHash(withdrawState.txHash)}
                </AlertDescription>
              </Alert>
            )}
            {withdrawState.error && (
              <Alert variant="destructive">
                <AlertDescription>
                  Error en retiro: {withdrawState.error}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tokens registrados */}
      {tokens && tokens.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Tokens Registrados</CardTitle>
            <CardDescription>
              Lista de tokens registrados en el contrato
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tokens.map((token, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <span className="font-mono text-sm">
                    {EncryptedERCUtils.formatAddress(token)}
                  </span>
                  <Badge variant="outline">Token {index}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EncryptedERCExample;
