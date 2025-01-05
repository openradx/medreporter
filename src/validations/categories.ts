import { z } from "zod"

export const GetCategoriesSchema = z.object({
  language: z.string(),
  prefix: z.string(),
})
