import { z } from "zod"
import { PaginationSchema } from "./common"

export const GetTagsSchema = PaginationSchema.extend({
  locale: z.string(),
  filter: z.string().optional(),
})
