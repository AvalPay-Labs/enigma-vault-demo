import { z } from 'zod'

export const DeploymentBasicsSchema = z.object({
  registrationVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  mintVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  withdrawVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  transferVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  burnVerifier: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
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
  executionTime: z.number(),
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

