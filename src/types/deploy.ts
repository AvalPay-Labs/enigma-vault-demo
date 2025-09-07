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
