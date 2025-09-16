import { z } from 'zod'

export const DeploymentBasicsSchema = z.object({
  registrationVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  mintVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  withdrawVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  transferVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  babyJubJub: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  deploymentFile: z.string(),
  erc20Token: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
})

export type DeploymentBasics = z.infer<typeof DeploymentBasicsSchema>

export const DeployBasicsResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: DeploymentBasicsSchema,
  timestamp: z.string(),
  executionTime: z.number().optional(),
})

export type DeployBasicsResponse = z.infer<typeof DeployBasicsResponseSchema>

export const DeployBasicsErrorSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  code: z.string().optional(),
  details: z.unknown().optional(),
  timestamp: z.string(),
  executionTime: z.number().optional(),
})

export type DeployBasicsError = z.infer<typeof DeployBasicsErrorSchema>

// Complete system deployment types
export const DeploymentSystemSchema = z.object({
  registrar: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  encryptedERC: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  registrationVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  mintVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  withdrawVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  transferVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  babyJubJub: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  deploymentFile: z.string(),
  erc20Token: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
})

export type DeploymentSystem = z.infer<typeof DeploymentSystemSchema>

export const DeploySystemResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: DeploymentSystemSchema,
  timestamp: z.string(),
  executionTime: z.number().optional(),
})

export type DeploySystemResponse = z.infer<typeof DeploySystemResponseSchema>

// Register user types
export const RegisterUserSchema = z.object({
  userAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  balance: z.number(),
  walletNumber: z.number(),
  role: z.string(),
  module: z.string(),
})

export type RegisterUserData = z.infer<typeof RegisterUserSchema>

export const RegisterUserResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: RegisterUserSchema,
  timestamp: z.string(),
  executionTime: z.number().optional(),
})

export type RegisterUserResponse = z.infer<typeof RegisterUserResponseSchema>

// Deposit types
export const DepositDataSchema = z.object({
  transactionHash: z.string().regex(/^0x[a-fA-F0-9]+$/),
  walletNumber: z.number(),
})

export type DepositData = z.infer<typeof DepositDataSchema>

export const DepositResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: DepositDataSchema,
  timestamp: z.string(),
  executionTime: z.number().optional(),
})

export type DepositResponse = z.infer<typeof DepositResponseSchema>

// Withdraw types
export const WithdrawDataSchema = z.object({
  transactionHash: z.string().regex(/^0x[a-fA-F0-9]+$/),
  walletNumber: z.number(),
})

export type WithdrawData = z.infer<typeof WithdrawDataSchema>

export const WithdrawResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: WithdrawDataSchema,
  timestamp: z.string(),
  executionTime: z.number().optional(),
})

export type WithdrawResponse = z.infer<typeof WithdrawResponseSchema>

// Converter: Set Auditor types
export const SetAuditorDataSchema = z.object({
  status: z.string().optional(),
  walletNumber: z.number().optional(),
  auditorAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
})

export type SetAuditorData = z.infer<typeof SetAuditorDataSchema>

export const SetAuditorResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: SetAuditorDataSchema.or(z.object({})),
  timestamp: z.string(),
  executionTime: z.number().optional(),
})

export type SetAuditorResponse = z.infer<typeof SetAuditorResponseSchema>

// Converter: Get Faucet types
export const GetFaucetDataSchema = z.object({
  transactionHash: z.string().regex(/^0x[a-fA-F0-9]+$/),
  walletNumber: z.number(),
})

export type GetFaucetData = z.infer<typeof GetFaucetDataSchema>

export const GetFaucetResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: GetFaucetDataSchema,
  timestamp: z.string(),
  executionTime: z.number().optional(),
})

export type GetFaucetResponse = z.infer<typeof GetFaucetResponseSchema>

// Converter Transfer types
export const ConverterTransferDataSchema = z.object({
  transactionHash: z.string().regex(/^0x[a-fA-F0-9]+$/).optional(),
  senderWallet: z.number().optional(),
  receiverWallet: z.number().optional(),
  senderWalletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  receiverWalletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  amount: z.number(),
})

export type ConverterTransferData = z.infer<typeof ConverterTransferDataSchema>

export const ConverterTransferResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: ConverterTransferDataSchema,
  timestamp: z.string(),
  executionTime: z.number().optional(),
})

export type ConverterTransferResponse = z.infer<typeof ConverterTransferResponseSchema>

// Converter Balance types
export const ConverterBalanceDataSchema = z.object({
  walletNumber: z.number().nullable().optional(),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).nullable().optional(),
  walletIdentifier: z.string(),
  encryptedBalance: z.number(),
}).refine(d => d.walletNumber !== null || d.walletAddress !== null, { message: 'Either walletNumber or walletAddress must be provided' })

export type ConverterBalanceData = z.infer<typeof ConverterBalanceDataSchema>

export const ConverterBalanceResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: ConverterBalanceDataSchema,
  timestamp: z.string(),
  executionTime: z.number().optional(),
})

export type ConverterBalanceResponse = z.infer<typeof ConverterBalanceResponseSchema>
