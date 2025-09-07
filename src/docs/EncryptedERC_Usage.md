# EncryptedERC Contract Integration

Esta documentación explica cómo usar todas las funciones del contrato EncryptedERC usando Web3/Ethers.js.

## Tabla de Contenidos

1. [Instalación y Configuración](#instalación-y-configuración)
2. [Tipos TypeScript](#tipos-typescript)
3. [Servicio Principal](#servicio-principal)
4. [Hooks Personalizados](#hooks-personalizados)
5. [Utilidades](#utilidades)
6. [Configuración](#configuración)
7. [Ejemplos de Uso](#ejemplos-de-uso)
8. [Funciones de Consulta](#funciones-de-consulta)
9. [Funciones de Transacción](#funciones-de-transacción)
10. [Manejo de Errores](#manejo-de-errores)

## Instalación y Configuración

### 1. Instalar dependencias

```bash
npm install ethers
```

### 2. Configurar variables de entorno

```env
VITE_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
VITE_CHAIN_ID=11155111
```

## Tipos TypeScript

### Estructuras Básicas

```typescript
// Punto en la curva elíptica
interface Point {
  x: BigNumberish;
  y: BigNumberish;
}

// Ciphertext de ElGamal
interface EGCT {
  c1: Point;
  c2: Point;
}

// Prueba de conocimiento cero
interface ProofPoints {
  a: [BigNumberish, BigNumberish];
  b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]];
  c: [BigNumberish, BigNumberish];
}
```

### Estructuras de Pruebas

```typescript
interface BurnProof {
  proofPoints: ProofPoints;
  publicSignals: BigNumberish[];
}

interface MintProof {
  proofPoints: ProofPoints;
  publicSignals: BigNumberish[];
}

interface TransferProof {
  proofPoints: ProofPoints;
  publicSignals: BigNumberish[];
}

interface WithdrawProof {
  proofPoints: ProofPoints;
  publicSignals: BigNumberish[];
}
```

## Servicio Principal

### EncryptedERCService

El servicio principal que maneja todas las interacciones con el contrato.

```typescript
import { EncryptedERCService } from "../services/encryptedERCService";
import { ContractConfig } from "../types/encryptedERC";

const config: ContractConfig = {
  contractAddress: "0x1234...",
  rpcUrl: "https://sepolia.infura.io/v3/...",
  chainId: 11155111,
};

const provider = new ethers.JsonRpcProvider(config.rpcUrl);
const service = new EncryptedERCService(config, provider);
```

## Hooks Personalizados

### 1. useEncryptedERC

Hook principal que proporciona todas las funciones del contrato.

```typescript
import { useEncryptedERC } from "../hooks/useEncryptedERC";

const { service, isConnected, connectWallet, getBalance, deposit, withdraw } =
  useEncryptedERC({
    contractAddress: "0x1234...",
    rpcUrl: "https://sepolia.infura.io/v3/...",
    chainId: 11155111,
    autoConnect: false,
  });
```

### 2. useEncryptedERCQueries

Hook especializado en funciones de consulta con estado.

```typescript
import { useEncryptedERCQueries } from "../hooks/useEncryptedERCQueries";

const { contractInfo, auditor, tokens, getBalance, refreshAll } =
  useEncryptedERCQueries({
    contractAddress: "0x1234...",
    rpcUrl: "https://sepolia.infura.io/v3/...",
    chainId: 11155111,
    refreshInterval: 30000,
  });
```

### 3. useEncryptedERCTransactions

Hook especializado en transacciones con manejo de estado.

```typescript
import { useEncryptedERCTransactions } from "../hooks/useEncryptedERCTransactions";

const { depositState, withdrawState, deposit, withdraw, clearAllErrors } =
  useEncryptedERCTransactions({
    contractAddress: "0x1234...",
    rpcUrl: "https://sepolia.infura.io/v3/...",
    chainId: 11155111,
  });
```

## Utilidades

### EncryptedERCUtils

Clase con utilidades para trabajar con el contrato.

```typescript
import { EncryptedERCUtils } from "../utils/encryptedERCUtils";

// Validaciones
const isValid = EncryptedERCUtils.isValidAddress("0x1234...");
const isValidTx = EncryptedERCUtils.isValidTxHash("0x1234...");

// Formateo
const formatted = EncryptedERCUtils.formatAddress("0x1234...");
const formattedTx = EncryptedERCUtils.formatTxHash("0x1234...");

// Conversiones
const wei = EncryptedERCUtils.etherToWei("1.0");
const ether = EncryptedERCUtils.weiToEther(wei);

// Creación de estructuras
const point = EncryptedERCUtils.createPoint(BigInt(1), BigInt(2));
const egct = EncryptedERCUtils.createEGCT(point, point);
```

## Configuración

### Configuración de Red

```typescript
import { getFullConfig, NETWORKS } from "../config/encryptedERCConfig";

// Obtener configuración completa
const config = getFullConfig(11155111); // Sepolia

// Usar redes predefinidas
const sepoliaConfig = NETWORKS.SEPOLIA;
const fujiConfig = NETWORKS.FUJI;
```

## Ejemplos de Uso

### Ejemplo Básico

```typescript
import React from "react";
import { useEncryptedERC } from "../hooks/useEncryptedERC";

const MyComponent: React.FC = () => {
  const { isConnected, connectWallet, getBalance, deposit } = useEncryptedERC({
    contractAddress: "0x1234...",
    rpcUrl: "https://sepolia.infura.io/v3/...",
    chainId: 11155111,
  });

  const handleConnect = async () => {
    await connectWallet();
  };

  const handleGetBalance = async () => {
    const balance = await getBalance("0xuser...", BigInt(0));
    console.log("Balance:", balance);
  };

  const handleDeposit = async () => {
    const success = await deposit({
      amount: BigInt("1000000000000000000"), // 1 token
      tokenAddress: "0xtoken...",
      amountPCT: [
        BigInt(0),
        BigInt(0),
        BigInt(0),
        BigInt(0),
        BigInt(0),
        BigInt(0),
        BigInt(0),
      ],
    });

    if (success) {
      console.log("Deposit successful");
    }
  };

  return (
    <div>
      {!isConnected ? (
        <button onClick={handleConnect}>Conectar Wallet</button>
      ) : (
        <div>
          <button onClick={handleGetBalance}>Obtener Balance</button>
          <button onClick={handleDeposit}>Depositar</button>
        </div>
      )}
    </div>
  );
};
```

## Funciones de Consulta

### Información del Contrato

```typescript
// Obtener información completa del contrato
const contractInfo = await service.getContractInfo();
console.log("Name:", contractInfo.name);
console.log("Symbol:", contractInfo.symbol);
console.log("Decimals:", contractInfo.decimals);
console.log("Is Converter:", contractInfo.isConverter);
console.log("Auditor:", contractInfo.auditor);
```

### Balances

```typescript
// Obtener balance encriptado
const balance = await service.getBalance(userAddress, tokenId);
console.log("Encrypted Balance:", balance.eGCT);
console.log("Nonce:", balance.nonce);
console.log("Transaction Index:", balance.transactionIndex);

// Obtener balance standalone
const standaloneBalance = await service.getBalanceStandalone(userAddress);

// Obtener balance básico
const basicBalance = await service.getBasicBalance(userAddress, tokenId);

// Obtener balance por dirección de token
const balanceByToken = await service.getBalanceFromTokenAddress(
  userAddress,
  tokenAddress
);
```

### Información de Tokens

```typescript
// Obtener lista de tokens
const tokens = await service.getTokens();
console.log("Registered tokens:", tokens);

// Obtener información de un token
const tokenInfo = await service.getTokenInfo(tokenAddress);
console.log("Token ID:", tokenInfo.id);
console.log("Is Blacklisted:", tokenInfo.isBlacklisted);

// Obtener ID de token por dirección
const tokenId = await service.getTokenId(tokenAddress);

// Obtener dirección de token por ID
const tokenAddress = await service.getTokenAddress(tokenId);
```

### Auditor

```typescript
// Obtener información del auditor
const auditor = await service.getAuditor();
const auditorPublicKey = await service.getAuditorPublicKey();
const isAuditorKeySet = await service.isAuditorKeySet();

console.log("Auditor:", auditor);
console.log("Public Key:", auditorPublicKey);
console.log("Key Set:", isAuditorKeySet);
```

### Verificaciones

```typescript
// Verificar si un nullifier ya fue usado
const alreadyMinted = await service.alreadyMinted(mintNullifier);

// Verificar si un token está en lista negra
const isBlacklisted = await service.isTokenBlacklisted(tokenAddress);

// Verificar si el contrato es converter
const isConverter = await service.isConverter();
```

## Funciones de Transacción

### Depósito

```typescript
const depositParams = {
  amount: BigInt("1000000000000000000"), // 1 token
  tokenAddress: "0xtoken...",
  amountPCT: [
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
  ],
};

const tx = await service.deposit(depositParams);
const receipt = await service.waitForTransaction(tx);
console.log("Deposit successful:", receipt.status === 1);
```

### Retiro

```typescript
const withdrawParams = {
  tokenId: BigInt(0),
  proof: {
    proofPoints: {
      a: [BigInt(1), BigInt(2)],
      b: [
        [BigInt(3), BigInt(4)],
        [BigInt(5), BigInt(6)],
      ],
      c: [BigInt(7), BigInt(8)],
    },
    publicSignals: [
      BigInt(1),
      BigInt(2),
      BigInt(3),
      BigInt(4),
      BigInt(5),
      BigInt(6),
      BigInt(7),
      BigInt(8),
      BigInt(9),
      BigInt(10),
      BigInt(11),
      BigInt(12),
      BigInt(13),
      BigInt(14),
      BigInt(15),
      BigInt(16),
    ],
  },
  balancePCT: [
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
  ],
};

const tx = await service.withdraw(withdrawParams);
const receipt = await service.waitForTransaction(tx);
```

### Transferencia

```typescript
const transferParams = {
  to: "0xrecipient...",
  tokenId: BigInt(0),
  proof: {
    proofPoints: {
      a: [BigInt(1), BigInt(2)],
      b: [
        [BigInt(3), BigInt(4)],
        [BigInt(5), BigInt(6)],
      ],
      c: [BigInt(7), BigInt(8)],
    },
    publicSignals: [
      /* 32 elementos */
    ],
  },
  balancePCT: [
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
  ],
};

const tx = await service.transfer(transferParams);
```

### Mint Privado

```typescript
const mintParams = {
  user: "0xuser...",
  proof: {
    proofPoints: {
      a: [BigInt(1), BigInt(2)],
      b: [
        [BigInt(3), BigInt(4)],
        [BigInt(5), BigInt(6)],
      ],
      c: [BigInt(7), BigInt(8)],
    },
    publicSignals: [
      /* 24 elementos */
    ],
  },
};

const tx = await service.privateMint(mintParams);
```

### Burn Privado

```typescript
const burnParams = {
  proof: {
    proofPoints: {
      a: [BigInt(1), BigInt(2)],
      b: [
        [BigInt(3), BigInt(4)],
        [BigInt(5), BigInt(6)],
      ],
      c: [BigInt(7), BigInt(8)],
    },
    publicSignals: [
      /* 19 elementos */
    ],
  },
  balancePCT: [
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
  ],
};

const tx = await service.privateBurn(burnParams);
```

### Configuración del Auditor

```typescript
// Establecer clave pública del auditor
const tx = await service.setAuditorPublicKey("0xauditor...");

// Establecer lista negra de token
const tx = await service.setTokenBlacklist("0xtoken...", true);
```

## Manejo de Errores

### Errores Comunes

```typescript
try {
  const balance = await service.getBalance(userAddress, tokenId);
} catch (error) {
  if (error.message.includes("UserNotRegistered")) {
    console.error("Usuario no registrado");
  } else if (error.message.includes("InvalidProof")) {
    console.error("Prueba inválida");
  } else if (error.message.includes("InsufficientBalance")) {
    console.error("Balance insuficiente");
  } else {
    console.error("Error desconocido:", error.message);
  }
}
```

### Manejo de Errores en Hooks

```typescript
const { error, clearError, depositState, withdrawState } =
  useEncryptedERCTransactions(config);

// Limpiar errores específicos
clearError("depositState");

// Limpiar todos los errores
clearAllErrors();

// Verificar estado de transacciones
if (depositState.error) {
  console.error("Error en depósito:", depositState.error);
}

if (withdrawState.isLoading) {
  console.log("Retiro en progreso...");
}
```

## Mejores Prácticas

### 1. Validación de Datos

```typescript
// Validar direcciones
if (!EncryptedERCUtils.isValidAddress(userAddress)) {
  throw new Error("Dirección inválida");
}

// Validar pruebas
if (!EncryptedERCUtils.validateWithdrawProof(proof)) {
  throw new Error("Prueba inválida");
}
```

### 2. Manejo de BigInt

```typescript
// Usar BigInt para cantidades
const amount = BigInt("1000000000000000000"); // 1 token

// Convertir a string para mostrar
const displayAmount = EncryptedERCUtils.formatNumber(amount, 18);
```

### 3. Gestión de Estado

```typescript
// Usar hooks especializados
const { contractInfo, refreshAll } = useEncryptedERCQueries(config);
const { depositState, deposit } = useEncryptedERCTransactions(config);

// Refrescar datos después de transacciones
const handleDeposit = async () => {
  const success = await deposit(params);
  if (success) {
    await refreshAll();
  }
};
```

### 4. Configuración de Red

```typescript
// Usar configuración centralizada
const config = getFullConfig(chainId);

// Verificar red correcta
const networkInfo = await getNetworkInfo();
if (networkInfo.chainId !== expectedChainId) {
  await switchNetwork(expectedChainId);
}
```

## Conclusión

Esta implementación proporciona una interfaz completa y type-safe para interactuar con el contrato EncryptedERC. Los hooks personalizados facilitan el manejo de estado y las transacciones, mientras que las utilidades proporcionan funciones de validación y formateo.

Para más ejemplos, consulta el archivo `src/examples/encryptedERCExample.tsx`.
