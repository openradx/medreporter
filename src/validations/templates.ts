import { ReleaseStatus, Visibility } from "@prisma/client"
import { z } from "zod"
import { PaginationSchema } from "./common"

// TODO: allow to update locale and maybe name
export const UpdateTemplateSchema = z.object({
  id: z.string(),
  document: z.any(), // TODO: add proper schema
  tags: z.string().array().optional(),
  visibility: z.nativeEnum(Visibility).optional(),
  releaseStatus: z.nativeEnum(ReleaseStatus).optional(),
})

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
