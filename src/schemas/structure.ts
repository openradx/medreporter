import { z } from "zod"
import { codeSchema, nodeSchema } from "./common"

/**
 * Shared properties
 */
const baseFieldIdSchema = z
  .string()
  .trim()
  .max(50)
  .regex(/^[a-z0-9_]*$/i, "Field ID must only contain letters, numbers, and underscores")
const optionalFieldIdSchema = baseFieldIdSchema.refine(
  (fieldId) => fieldId.length === 0 || fieldId.length >= 3,
  { message: "Field ID must be at least 3 characters long" }
)
const requiredFieldIdSchema = baseFieldIdSchema.min(3)
const optionalLabelSchema = z.string().trim().max(100)
const requiredLabelSchema = optionalLabelSchema.min(1)
const infoSchema = z.string().trim()
const disabledSchema = codeSchema
const hiddenSchema = codeSchema
const figureSchema = z.string().trim().max(10000)

const fieldProperties = {
  fieldId: requiredFieldIdSchema,
  label: requiredLabelSchema,
  info: infoSchema,
  disabled: disabledSchema,
  hidden: hiddenSchema,
}

/**
 * Nodes
 */
const hintNodeSchema = nodeSchema.extend({
  type: z.literal("Hint"),
  level: z.enum(["info", "warning", "error"]),
  content: codeSchema,
})

export type HintNode = z.infer<typeof hintNodeSchema>

export const booleanFieldNodeSchema = nodeSchema.extend({
  type: z.literal("BooleanField"),
  ...fieldProperties,
  default: z.boolean(),
})

export type BooleanFieldNode = z.infer<typeof booleanFieldNodeSchema>

export const numberFieldNodeSchema = nodeSchema.extend({
  type: z.literal("NumberField"),
  ...fieldProperties,
  min: z.number().optional(),
  max: z.number().optional(),
  precision: z.number(),
  start: z.number(),
  step: z.number(),
  default: z.number().nullable(),
})

export type NumberFieldNode = z.infer<typeof numberFieldNodeSchema>

// TODO: refine format and default
const dateFieldNodeSchema = nodeSchema.extend({
  type: z.literal("DateField"),
  ...fieldProperties,
  format: z.string().trim().optional(),
  default: z.string().trim().nullable(),
})

export type DateFieldNode = z.infer<typeof dateFieldNodeSchema>

// TODO: refine default
const timeFieldNodeSchema = nodeSchema.extend({
  type: z.literal("TimeField"),
  ...fieldProperties,
  withSeconds: z.boolean(),
  default: z.string().trim().nullable(),
})

export type TimeFieldNode = z.infer<typeof timeFieldNodeSchema>

const freeTextFieldNodeSchema = nodeSchema.extend({
  type: z.literal("FreeTextField"),
  ...fieldProperties,
  multiline: z.boolean(),
  default: z.string().trim(),
})

export type FreeTextFieldNode = z.infer<typeof freeTextFieldNodeSchema>

const optionSchema = z.object({
  label: requiredLabelSchema,
  value: optionalLabelSchema,
})

export type Option = z.infer<typeof optionSchema>

const optionsSchema = z
  .array(optionSchema)
  .refine(
    (options) => {
      // check for duplicate labels
      const labelSet = new Set()
      for (const opt of options) {
        if (labelSet.has(opt.label)) {
          return false
        }
        labelSet.add(opt.label)
      }
      return true // no duplicates found
    },
    { message: "Duplicate option labels." }
  )
  .refine(
    (options) => {
      // check for duplicate values
      const valueSet = new Set()
      for (const opt of options) {
        if (valueSet.has(opt.value)) {
          return false
        }
        valueSet.add(opt.value)
      }
      return true // no duplicates found
    },
    { message: "Duplicate option values." }
  )

const singleChoiceFieldNodeSchema = nodeSchema.extend({
  type: z.literal("SingleChoiceField"),
  ...fieldProperties,
  variant: z.enum(["radio", "select"]),
  figure: figureSchema,
  options: optionsSchema,
  default: z.string().trim().nullable(),
})

export type SingleChoiceFieldNode = z.infer<typeof singleChoiceFieldNodeSchema>

const multipleChoiceFieldNodeSchema = nodeSchema.extend({
  type: z.literal("MultipleChoiceField"),
  ...fieldProperties,
  variant: z.enum(["checkbox", "select"]),
  figure: figureSchema,
  options: optionsSchema,
  default: z.array(z.string().trim()),
})

export type MultipleChoiceFieldNode = z.infer<typeof multipleChoiceFieldNodeSchema>

const measurementsFieldNodeSchema = nodeSchema.extend({
  type: z.literal("MeasurementsField"),
  ...fieldProperties,
})

export type MeasurementsFieldNode = z.infer<typeof measurementsFieldNodeSchema>

export type DiscreteFieldNode =
  | BooleanFieldNode
  | NumberFieldNode
  | DateFieldNode
  | TimeFieldNode
  | FreeTextFieldNode
  | SingleChoiceFieldNode
  | MultipleChoiceFieldNode
  | MeasurementsFieldNode

const discreteFieldNodeSchemas = [
  booleanFieldNodeSchema,
  numberFieldNodeSchema,
  dateFieldNodeSchema,
  timeFieldNodeSchema,
  freeTextFieldNodeSchema,
  singleChoiceFieldNodeSchema,
  multipleChoiceFieldNodeSchema,
  measurementsFieldNodeSchema,
] as const

export const groupNodeSchema = nodeSchema.extend({
  type: z.literal("Group"),
  ...fieldProperties,
  direction: z.enum(["row", "column"]),
  justify: z.enum(["start", "center", "end", "space-between", "space-around"]),
  border: z.boolean(),
  fieldId: optionalFieldIdSchema,
  label: optionalLabelSchema,
  children: z.array(z.union([hintNodeSchema, ...discreteFieldNodeSchemas])),
})

export type GroupNode = z.infer<typeof groupNodeSchema>

export const groupChildrenTypes = new Set(
  groupNodeSchema.shape.children.element.options.map((o) => o.shape.type.value)
)

const findingFieldNodeSchema = nodeSchema.extend({
  type: z.literal("FindingField"),
  ...fieldProperties,
  default: z.boolean().optional(),
  children: z.array(z.union([hintNodeSchema, ...discreteFieldNodeSchemas, groupNodeSchema])),
})

export type FindingFieldNode = z.infer<typeof findingFieldNodeSchema>

export const findingFieldChildrenTypes = new Set(
  findingFieldNodeSchema.shape.children.element.options.map((o) => o.shape.type.value)
)

const sectionNodeSchema = nodeSchema.extend({
  type: z.literal("Section"),
  label: requiredLabelSchema.default("Section 1"),
  children: z.array(
    z.union([findingFieldNodeSchema, groupNodeSchema, hintNodeSchema, ...discreteFieldNodeSchemas])
  ),
})

export type SectionNode = z.infer<typeof sectionNodeSchema>

export const sectionChildrenTypes = new Set(
  sectionNodeSchema.shape.children.element.options.map((o) => o.shape.type.value)
)

export const structureNodeSchema = nodeSchema.extend({
  type: z.literal("Structure"),
  children: z.array(sectionNodeSchema),
})

export type StructureNode = z.infer<typeof structureNodeSchema>

export const structureChildrenTypes = new Set([
  structureNodeSchema.shape.children.element.shape.type.value,
])
