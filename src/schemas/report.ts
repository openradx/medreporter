import { z } from "zod"
import { codeSchema, nodeSchema } from "./common"

const statementNodeSchema = nodeSchema.extend({
  type: z.literal("Statement"),
  link: z.string().optional(), // link to a field
  content: codeSchema.optional(),
})

export type StatementNode = z.infer<typeof statementNodeSchema>

const paragraphNodeSchema = nodeSchema.extend({
  type: z.literal("Paragraph"),
  link: z.string().optional(), // link to a field
  title: z.string().optional(),
  hidden: codeSchema.optional(),
  list: z.boolean(),
  children: z.array(statementNodeSchema),
})

export type ParagraphNode = z.infer<typeof paragraphNodeSchema>

export const paragraphChildrenTypes = new Set([
  paragraphNodeSchema.shape.children.element.shape.type.value,
])

export const measurementsOutputNodeSchema = nodeSchema.extend({
  type: z.literal("MeasurementsOutput"),
  link: z.string(), // link to a field
  legend: z.string().optional(),
  previousLabel: z.string().optional(),
  currentLabel: z.string().optional(),
  locationLabel: z.string().optional(),
  referenceLabel: z.string().optional(),
})

export type MeasurementsOutputNode = z.infer<typeof measurementsOutputNodeSchema>

export const reportNodeSchema = nodeSchema.extend({
  type: z.literal("Report"),
  children: z.array(
    z.union([statementNodeSchema, paragraphNodeSchema, measurementsOutputNodeSchema])
  ),
})

export const reportChildrenTypes = new Set(
  reportNodeSchema.shape.children.element.options.map((o) => o.shape.type.value)
)

export type ReportNode = z.infer<typeof reportNodeSchema>
