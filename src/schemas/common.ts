import { z } from "zod"

export const nodeSchema = z.object({
  nodeId: z.string(),
  timestamp: z.number(),
})

export const codeSchema = z.string()
