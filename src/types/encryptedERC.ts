import { BigNumberish } from "ethers";

// Estructuras básicas del contrato
export interface Point {
  x: BigNumberish;
  y: BigNumberish;
}

export interface EGCT {
  c1: Point;
  c2: Point;
}

export interface AmountPCT {
  pct: BigNumberish[];
  index: BigNumberish;
}

export interface ProofPoints {
  a: [BigNumberish, BigNumberish];
  b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]];
  c: [BigNumberish, BigNumberish];
}

// Estructuras de pruebas
export interface BurnProof {
  proofPoints: ProofPoints;
  publicSignals: BigNumberish[];
}

export interface MintProof {
  proofPoints: ProofPoints;
  publicSignals: BigNumberish[];
}

export interface TransferProof {
  proofPoints: ProofPoints;
  publicSignals: BigNumberish[];
}

export interface WithdrawProof {
  proofPoints: ProofPoints;
  publicSignals: BigNumberish[];
}

// Parámetros de creación del contrato
export interface CreateEncryptedERCParams {
  registrar: string;
  isConverter: boolean;
  name: string;
  symbol: string;
  decimals: BigNumberish;
  mintVerifier: string;
  withdrawVerifier: string;
  transferVerifier: string;
  burnVerifier: string;
}

// Estructura de balance encriptado
export interface EncryptedBalance {
  eGCT: EGCT;
  nonce: BigNumberish;
  amountPCTs: AmountPCT[];
  balancePCT: BigNumberish[];
  transactionIndex: BigNumberish;
}

// Estructura de balance básico
export interface BasicBalance {
  eGCT: EGCT;
  nonce: BigNumberish;
  transactionIndex: BigNumberish;
}

// Eventos del contrato
export interface PrivateMintEvent {
  user: string;
  auditorPCT: BigNumberish[];
  auditorAddress: string;
}

export interface PrivateBurnEvent {
  user: string;
  auditorPCT: BigNumberish[];
  auditorAddress: string;
}

export interface PrivateTransferEvent {
  from: string;
  to: string;
  auditorPCT: BigNumberish[];
  auditorAddress: string;
}

export interface DepositEvent {
  user: string;
  amount: BigNumberish;
  dust: BigNumberish;
  tokenId: BigNumberish;
}

export interface WithdrawEvent {
  user: string;
  amount: BigNumberish;
  tokenId: BigNumberish;
  auditorPCT: BigNumberish[];
  auditorAddress: string;
}

// Configuración del contrato
export interface ContractConfig {
  contractAddress: string;
  rpcUrl: string;
  chainId: number;
}

// Parámetros para transacciones
export interface DepositParams {
  amount: BigNumberish;
  tokenAddress: string;
  amountPCT: BigNumberish[];
}

export interface WithdrawParams {
  tokenId: BigNumberish;
  proof: WithdrawProof;
  balancePCT: BigNumberish[];
}

export interface TransferParams {
  to: string;
  tokenId: BigNumberish;
  proof: TransferProof;
  balancePCT: BigNumberish[];
}

export interface PrivateMintParams {
  user: string;
  proof: MintProof;
}

export interface PrivateBurnParams {
  proof: BurnProof;
  balancePCT: BigNumberish[];
}

// Resultados de consultas
export interface TokenInfo {
  address: string;
  id: BigNumberish;
  isBlacklisted: boolean;
}

export interface ContractInfo {
  name: string;
  symbol: string;
  decimals: BigNumberish;
  isConverter: boolean;
  auditor: string;
  isAuditorKeySet: boolean;
  registrar: string;
  nextTokenId: BigNumberish;
}
