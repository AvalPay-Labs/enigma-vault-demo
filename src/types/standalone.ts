import { z } from 'zod'

// Standalone Deployment Basics Schema
export const StandaloneDeploymentBasicsSchema = z.object({
  registrationVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  mintVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  withdrawVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  transferVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  burnVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  babyJubJub: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  deploymentFile: z.string(),
})

export type StandaloneDeploymentBasics = z.infer<typeof StandaloneDeploymentBasicsSchema>

export const StandaloneDeployBasicsResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: StandaloneDeploymentBasicsSchema,
  timestamp: z.string(),
  executionTime: z.number().optional(),
})

export type StandaloneDeployBasicsResponse = z.infer<typeof StandaloneDeployBasicsResponseSchema>

// Standalone System Deployment Schema
export const StandaloneDeploymentSystemSchema = z.object({
  registrar: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  encryptedERC: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  registrationVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  mintVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  withdrawVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  transferVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  burnVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  babyJubJub: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  deploymentFile: z.string(),
})

export type StandaloneDeploymentSystem = z.infer<typeof StandaloneDeploymentSystemSchema>

export const StandaloneDeploySystemResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: StandaloneDeploymentSystemSchema,
  timestamp: z.string(),
  executionTime: z.number().optional(),
})

export type StandaloneDeploySystemResponse = z.infer<typeof StandaloneDeploySystemResponseSchema>

// Register User Schema
export const StandaloneRegisterUserSchema = z.object({
  userAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  balance: z.number(),
  walletNumber: z.number(),
})

export type StandaloneRegisterUserData = z.infer<typeof StandaloneRegisterUserSchema>

export const StandaloneRegisterUserResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: StandaloneRegisterUserSchema,
  timestamp: z.string(),
  executionTime: z.number().optional(),
})

export type StandaloneRegisterUserResponse = z.infer<typeof StandaloneRegisterUserResponseSchema>

// Set Auditor Schema
export const StandaloneSetAuditorResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({}),
  timestamp: z.string(),
  executionTime: z.number().optional(),
})

export type StandaloneSetAuditorResponse = z.infer<typeof StandaloneSetAuditorResponseSchema>

// Mint Schema
export const StandaloneMintDataSchema = z.object({
  amount: z.number(),
  transactionHash: z.string().regex(/^0x[a-fA-F0-9]+$/).optional(),
  ownerWallet: z.number().optional(),
  userWallet: z.number().optional(),
  ownerWalletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  userWalletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
})

export type StandaloneMintData = z.infer<typeof StandaloneMintDataSchema>

export const StandaloneMintResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: StandaloneMintDataSchema,
  timestamp: z.string(),
  executionTime: z.number().optional(),
})

export type StandaloneMintResponse = z.infer<typeof StandaloneMintResponseSchema>

// Balance Schema
export const StandaloneBalanceDataSchema = z.object({
  walletNumber: z.number().nullable().optional(),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).nullable().optional(),
  walletIdentifier: z.string(),
  encryptedBalance: z.number(),
}).refine(data => data.walletNumber !== null || data.walletAddress !== null, {
  message: "Either walletNumber or walletAddress must be provided"
})

export type StandaloneBalanceData = z.infer<typeof StandaloneBalanceDataSchema>

export const StandaloneBalanceResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: StandaloneBalanceDataSchema,
  timestamp: z.string(),
  executionTime: z.number().optional(),
})

export type StandaloneBalanceResponse = z.infer<typeof StandaloneBalanceResponseSchema>

// Transfer Schema
export const StandaloneTransferDataSchema = z.object({
  transactionHash: z.string().regex(/^0x[a-fA-F0-9]+$/).optional(),
  senderWallet: z.number().optional(),
  receiverWallet: z.number().optional(),
  senderWalletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  receiverWalletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  amount: z.number(),
})

export type StandaloneTransferData = z.infer<typeof StandaloneTransferDataSchema>

export const StandaloneTransferResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: StandaloneTransferDataSchema,
  timestamp: z.string(),
  executionTime: z.number().optional(),
})

export type StandaloneTransferResponse = z.infer<typeof StandaloneTransferResponseSchema>

// Burn Schema
export const StandaloneBurnDataSchema = z.object({
  walletNumber: z.number().optional(),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  amount: z.number().optional(),
  burnedAmount: z.number().optional(),
})

export type StandaloneBurnData = z.infer<typeof StandaloneBurnDataSchema>

export const StandaloneBurnResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: StandaloneBurnDataSchema,
  timestamp: z.string(),
  executionTime: z.number().optional(),
})

export type StandaloneBurnResponse = z.infer<typeof StandaloneBurnResponseSchema>

// Request types
export const WalletRequestSchema = z.object({
  walletNumber: z.number().optional(),
  walletAddress: z.string().optional(),
}).refine(data => data.walletNumber || data.walletAddress, {
  message: "Either walletNumber or walletAddress must be provided"
})

export type WalletRequest = z.infer<typeof WalletRequestSchema>

export const MintRequestSchema = z.object({
  ownerWalletNumber: z.number().optional(),
  ownerWalletAddress: z.string().optional(),
  userWalletNumber: z.number().optional(),
  userWalletAddress: z.string().optional(),
  amount: z.number().optional().default(50),
}).refine(data => (data.ownerWalletNumber || data.ownerWalletAddress) && (data.userWalletNumber || data.userWalletAddress), {
  message: "Both owner and user wallet information must be provided"
})

export type MintRequest = z.infer<typeof MintRequestSchema>

export const TransferRequestSchema = z.object({
  senderWalletNumber: z.number().optional(),
  senderWalletAddress: z.string().optional(),
  receiverWalletNumber: z.number().optional(),
  receiverWalletAddress: z.string().optional(),
  amount: z.number().optional().default(30),
}).refine(data => (data.senderWalletNumber || data.senderWalletAddress) && (data.receiverWalletNumber || data.receiverWalletAddress), {
  message: "Both sender and receiver wallet information must be provided"
})

export type TransferRequest = z.infer<typeof TransferRequestSchema>

export const BurnRequestSchema = z.object({
  walletNumber: z.number().optional(),
  walletAddress: z.string().optional(),
  amount: z.number().optional().default(20),
}).refine(data => data.walletNumber || data.walletAddress, {
  message: "Either walletNumber or walletAddress must be provided"
})

export type BurnRequest = z.infer<typeof BurnRequestSchema>
