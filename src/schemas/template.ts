import { z } from "zod"
import { nodeSchema } from "./common"
import { reportNodeSchema } from "./report"
import { structureNodeSchema } from "./structure"

export const templateNodeSchema = nodeSchema.extend({
  type: z.literal("Template"),
  language: z.string().regex(/^([a-z]{2})(-[A-Z]{2})?$/),
  name: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9_]*$/, "Name must only contain letters, numbers, and underscores"),
  title: z.string().trim().min(1).max(100),
  description: z.string().trim().max(1000),
  categories: z.array(z.string().trim().min(1).max(100)),
  info: z.string().trim().max(10000),
  structure: structureNodeSchema,
  report: reportNodeSchema,
})

export type TemplateNode = z.infer<typeof templateNodeSchema>
