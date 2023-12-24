import { z } from "zod"
import { nodeSchema } from "./common"
import { reportNodeSchema } from "./report"
import { structureNodeSchema } from "./structure"

export const templateNodeSchema = nodeSchema.extend({
  type: z.literal("Template"),
  title: z.string().trim().min(1).max(100),
  info: z.string().trim().max(1000).optional(),
  structure: structureNodeSchema,
  report: reportNodeSchema,
})

export type TemplateNode = z.infer<typeof templateNodeSchema>
