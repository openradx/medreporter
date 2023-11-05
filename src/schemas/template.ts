import { z } from "zod"
import { nodeSchema } from "./common"
import { reportNodeSchema } from "./report"
import { structureNodeSchema } from "./structure"

export const templateNodeSchema = nodeSchema.extend({
  type: z.literal("Template"),
  title: z.string(),
  info: z.string().optional(),
  structure: structureNodeSchema,
  report: reportNodeSchema,
})

export type TemplateNode = z.infer<typeof templateNodeSchema>
