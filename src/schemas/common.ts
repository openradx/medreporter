import { z } from "zod"

export const elementSchema = z.object({
  gid: z.string(),
})

export const codeSchema = z.string()
