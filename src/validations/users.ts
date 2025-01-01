import { z } from "zod"

export const GetUsersSchema = z.object({
  prefix: z.string(),
})
