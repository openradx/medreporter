import { z } from "zod"
import { elementSchema } from "./common"
import { reportElSchema } from "./report"
import { structureElSchema } from "./structure"

export const templateElSchema = elementSchema.extend({
  type: z.literal("Template"),
  title: z.string(),
  info: z.string().optional(),
  structure: structureElSchema,
  report: reportElSchema,
})

export type TemplateEl = z.infer<typeof templateElSchema>
