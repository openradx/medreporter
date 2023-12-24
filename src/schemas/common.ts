import { z } from "zod"

export const nodeSchema = z.object({
  nodeId: z.string(),
})

export const codeSchema = z.string().trim().max(10000)
