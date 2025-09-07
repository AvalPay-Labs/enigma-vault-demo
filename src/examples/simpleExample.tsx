import React, { useState } from "react";
import { useEncryptedERC } from "../hooks/useEncryptedERC";
import { EncryptedERCUtils } from "../utils/encryptedERCUtils";
import { getFullConfig } from "../config/encryptedERCConfig";

/**
 * Ejemplo simple de uso del contrato EncryptedERC
 */
export const SimpleExample: React.FC = () => {
  const [userAddress, setUserAddress] = useState("");
  const [balance, setBalance] = useState<any>(null);

  // Configuración del contrato
  const config = getFullConfig();
  const contractConfig = config.contract;

  // Hook principal
  const {
    isConnected,
    isLoading,
    error,
    connectWallet,
    getBalance,
    getContractInfo,
  } = useEncryptedERC({
    contractAddress: contractConfig.contractAddress,
    rpcUrl: contractConfig.rpcUrl,
    chainId: contractConfig.chainId,
    autoConnect: false,
  });

  // Funciones de ejemplo
  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleGetBalance = async () => {
    if (!userAddress) return;

    try {
      const balanceData = await getBalance(userAddress, BigInt(0));
      setBalance(balanceData);
    } catch (error) {
      console.error("Error getting balance:", error);
    }
  };

  const handleGetContractInfo = async () => {
    try {
      const info = await getContractInfo();
      console.log("Contract Info:", info);
    } catch (error) {
      console.error("Error getting contract info:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">
        EncryptedERC Simple Example
      </h1>

      {/* Estado de conexión */}
      <div className="p-4 border rounded">
        <h2 className="font-semibold mb-2">Estado de Conexión</h2>
        <p>Conectado: {isConnected ? "Sí" : "No"}</p>
        <p>Cargando: {isLoading ? "Sí" : "No"}</p>
        {error && <p className="text-red-500">Error: {error}</p>}

        {!isConnected && (
          <button
            onClick={handleConnect}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Conectando..." : "Conectar Wallet"}
          </button>
        )}
      </div>

      {/* Información del contrato */}
      <div className="p-4 border rounded">
        <h2 className="font-semibold mb-2">Información del Contrato</h2>
        <p>
          Dirección:{" "}
          {EncryptedERCUtils.formatAddress(contractConfig.contractAddress)}
        </p>
        <p>Chain ID: {contractConfig.chainId}</p>

        <button
          onClick={handleGetContractInfo}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          disabled={!isConnected}
        >
          Obtener Info del Contrato
        </button>
      </div>

      {/* Consulta de balance */}
      <div className="p-4 border rounded">
        <h2 className="font-semibold mb-2">Consulta de Balance</h2>

        <input
          type="text"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          placeholder="Dirección del usuario (0x...)"
          className="w-full p-2 border rounded mb-2"
        />

        <button
          onClick={handleGetBalance}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          disabled={!isConnected || !userAddress}
        >
          Obtener Balance
        </button>

        {balance && (
          <div className="mt-4 p-2 bg-gray-100 rounded">
            <h3 className="font-semibold">Balance:</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(
                balance,
                (key, value) =>
                  typeof value === "bigint" ? value.toString() : value,
                2
              )}
            </pre>
          </div>
        )}
      </div>

      {/* Instrucciones */}
      <div className="p-4 bg-blue-50 rounded">
        <h2 className="font-semibold mb-2">Instrucciones:</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Conecta tu wallet haciendo clic en "Conectar Wallet"</li>
          <li>Obtén información del contrato</li>
          <li>Ingresa una dirección de usuario válida</li>
          <li>Consulta el balance encriptado</li>
        </ol>
      </div>
    </div>
  );
};

export default SimpleExample;
