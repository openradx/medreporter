import { z } from "zod"
import { PaginationSchema } from "./common"

export const GetCategoriesSchema = PaginationSchema.extend({
  language: z.string(),
  filter: z.string().optional(),
})
