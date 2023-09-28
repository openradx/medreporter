import { z } from "zod"

export const element = z.object({
  uuid: z.string(),
})

export const code = z.string()
