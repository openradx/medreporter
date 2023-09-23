import { ResourceType } from "@prisma/client"
import { z } from "zod"
import { PaginationSchema } from "./common"

export const GetTagsSchema = PaginationSchema.extend({
  type: z.nativeEnum(ResourceType),
  locale: z.string(),
  filter: z.string().optional(),
})
