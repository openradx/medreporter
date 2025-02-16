import { z } from "zod"
import { PaginationSchema } from "./common"

export const FetchOwnTemplateSchema = z.object({
  slug: z.string(),
})

export const GetTemplateSchema = z.object({
  username: z.string(), // username of author
  slug: z.string(),
})

export const GetTemplatesSchema = PaginationSchema.extend({
  categories: z.string().array(),
  language: z.string(),
  search: z.string(),
  username: z.string(),
  sorting: z.string(),
})
