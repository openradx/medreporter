import { z } from "zod"
import { codeSchema, elementSchema } from "./common"

const statementElSchema = elementSchema.extend({
  type: z.literal("Statement"),
  fieldId: z.string().optional(), // link to a field
  content: codeSchema.optional(),
})

export type StatementEl = z.infer<typeof statementElSchema>

const paragraphElSchema = elementSchema.extend({
  type: z.literal("Paragraph"),
  fieldId: z.string().optional(), // link to a field
  title: z.string().optional(),
  hidden: codeSchema.optional(),
  list: z.boolean().optional(),
  children: z.array(statementElSchema),
})

export type ParagraphEl = z.infer<typeof paragraphElSchema>

export const measurementsOutputElSchema = elementSchema.extend({
  type: z.literal("MeasurementsOutput"),
  fieldId: z.string(),
  legend: z.string().optional(),
  previousLabel: z.string().optional(),
  currentLabel: z.string().optional(),
  locationLabel: z.string().optional(),
  referenceLabel: z.string().optional(),
})

export type MeasurementsOutputEl = z.infer<typeof measurementsOutputElSchema>

export const reportElSchema = elementSchema.extend({
  type: z.literal("Report"),
  children: z.array(z.union([statementElSchema, paragraphElSchema, measurementsOutputElSchema])),
})

export type ReportEl = z.infer<typeof reportElSchema>
