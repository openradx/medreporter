import { z } from "zod"
import { codeSchema, elementSchema } from "./common"

/**
 * Shared properties
 */
const id = z.string()
const label = z.string()
const info = z.string().optional()
const disabled = codeSchema.optional()
const hidden = codeSchema.optional()

const fieldProperties = { id, label, info, disabled, hidden }

/**
 * Elements
 */
const hintElSchema = elementSchema.extend({
  type: z.literal("Hint"),
  level: z.enum(["info", "warning", "error"]),
  fieldRef: z.string().optional(),
  content: codeSchema.optional(),
})

export type HintEl = z.infer<typeof hintElSchema>

const booleanFieldElSchema = elementSchema.extend({
  type: z.literal("BooleanField"),
  ...fieldProperties,
  default: z.boolean().optional(),
})

export type BooleanFieldEl = z.infer<typeof booleanFieldElSchema>

const numberFieldElSchema = elementSchema.extend({
  type: z.literal("NumberField"),
  ...fieldProperties,
  min: z.number().optional(),
  max: z.number().optional(),
  precision: z.number().optional(),
  start: z.number().optional(),
  step: z.number().optional(),
  default: z.number().optional(),
})

export type NumberFieldEl = z.infer<typeof numberFieldElSchema>

// TODO: refine format and default
const dateFieldElSchema = elementSchema.extend({
  type: z.literal("DateField"),
  ...fieldProperties,
  format: z.string().optional(),
  default: z.string().optional(),
})

export type DateFieldEl = z.infer<typeof dateFieldElSchema>

// TODO: refine default
const timeFieldElSchema = elementSchema.extend({
  type: z.literal("TimeField"),
  ...fieldProperties,
  withSeconds: z.boolean().optional(),
  default: z.string().optional(),
})

export type TimeFieldEl = z.infer<typeof timeFieldElSchema>

const freeTextFieldElSchema = elementSchema.extend({
  type: z.literal("FreeTextField"),
  ...fieldProperties,
  multiline: z.boolean().optional(),
  default: z.string().optional(),
})

export type FreeTextFieldEl = z.infer<typeof freeTextFieldElSchema>

const option = z.object({
  label: z.string(),
  value: z.string(),
})

export type Option = z.infer<typeof option>

const singleChoiceFieldElSchema = elementSchema.extend({
  type: z.literal("SingleChoiceField"),
  ...fieldProperties,
  variant: z.enum(["radio", "select"]).optional(),
  figure: z.string().optional(),
  options: z.array(option).optional(),
  default: z.string().optional(),
})

export type SingleChoiceFieldEl = z.infer<typeof singleChoiceFieldElSchema>

const multipleChoiceFieldElSchema = elementSchema.extend({
  type: z.literal("MultipleChoiceField"),
  ...fieldProperties,
  variant: z.enum(["checkbox", "select"]).optional(),
  figure: z.string().optional(),
  options: z.array(option).optional(),
  default: z.array(z.string()).optional(),
})

export type MultipleChoiceFieldEl = z.infer<typeof multipleChoiceFieldElSchema>

const measurementsFieldElSchema = elementSchema.extend({
  type: z.literal("MeasurementsField"),
  ...fieldProperties,
})

export type MeasurementsFieldEl = z.infer<typeof measurementsFieldElSchema>

export type DiscreteFieldEl =
  | BooleanFieldEl
  | NumberFieldEl
  | DateFieldEl
  | TimeFieldEl
  | FreeTextFieldEl
  | SingleChoiceFieldEl
  | MultipleChoiceFieldEl
  | MeasurementsFieldEl

export type LayoutEl = z.infer<typeof elementSchema> & {
  type: "Layout"
  direction?: "row" | "column"
  nowrap?: boolean
  justify?: "start" | "center" | "end" | "space-between" | "space-around"
  children: (DiscreteFieldEl | HintEl | LayoutEl)[]
}

const discreteFieldElSchemas = [
  booleanFieldElSchema,
  numberFieldElSchema,
  dateFieldElSchema,
  timeFieldElSchema,
  freeTextFieldElSchema,
  singleChoiceFieldElSchema,
  multipleChoiceFieldElSchema,
  measurementsFieldElSchema,
] as const

const layoutElSchema: z.ZodType<LayoutEl> = z.lazy(() =>
  elementSchema.extend({
    type: z.literal("Layout"),
    direction: z.enum(["row", "column"]).optional(),
    justify: z.enum(["start", "center", "end", "space-between", "space-around"]).optional(),
    nowrap: z.boolean().optional(),
    children: z.array(z.union([layoutElSchema, hintElSchema, ...discreteFieldElSchemas])),
  })
)

const findingFieldElSchema = elementSchema.extend({
  type: z.literal("FindingField"),
  ...fieldProperties,
  default: z.boolean().optional(),
  children: z.array(z.union([layoutElSchema, hintElSchema, ...discreteFieldElSchemas])),
})

export type FindingFieldEl = z.infer<typeof findingFieldElSchema>

const groupElSchema = elementSchema.extend({
  type: z.literal("Group"),
  label: label.optional(),
  info,
  disabled,
  hidden,
  children: z.array(z.union([layoutElSchema, hintElSchema, ...discreteFieldElSchemas])),
})

export type GroupEl = z.infer<typeof groupElSchema>

const sectionElSchema = elementSchema.extend({
  type: z.literal("Section"),
  label,
  children: z.array(
    z.union([
      findingFieldElSchema,
      groupElSchema,
      layoutElSchema,
      hintElSchema,
      ...discreteFieldElSchemas,
    ])
  ),
})

export type SectionEl = z.infer<typeof sectionElSchema>

export const structureElSchema = elementSchema.extend({
  type: z.literal("Structure"),
  children: z.array(sectionElSchema),
})

export type StructureEl = z.infer<typeof structureElSchema>
