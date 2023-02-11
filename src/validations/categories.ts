import { ResourceType } from "@prisma/client"
import { z } from "zod"
import { PaginationSchema } from "./common"

export const GetCategoriesSchema = PaginationSchema.extend({
  language: z.string(),
  type: z.nativeEnum(ResourceType).optional(),
  filter: z.string().optional(),
})
