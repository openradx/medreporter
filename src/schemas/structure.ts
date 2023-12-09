import { z } from "zod"
import { codeSchema, nodeSchema } from "./common"

/**
 * Shared properties
 */
const fieldIdSchema = z
  .string()
  .min(3)
  .max(50)
  .regex(/^[a-z0-9_]+$/i, "Field ID must only contain letters, numbers, and underscores")
const labelSchema = z.string().trim().min(1).max(100)
const infoSchema = z.string().trim().optional()
const disabledSchema = codeSchema.optional()
const hiddenSchema = codeSchema.optional()
const figureSchema = z.string().trim().max(10000).optional()

const fieldProperties = {
  fieldId: fieldIdSchema,
  label: labelSchema,
  info: infoSchema,
  disabled: disabledSchema,
  hidden: hiddenSchema,
}

/**
 * Nodes
 */
const hintNodeSchema = nodeSchema.extend({
  type: z.literal("Hint"),
  level: z.enum(["info", "warning", "error"]).optional(),
  fieldRef: z.string().trim().optional(),
  content: codeSchema.optional(),
})

export type HintNode = z.infer<typeof hintNodeSchema>

export const booleanFieldNodeSchema = nodeSchema.extend({
  type: z.literal("BooleanField"),
  ...fieldProperties,
  default: z.boolean().optional(),
})

export type BooleanFieldNode = z.infer<typeof booleanFieldNodeSchema>

const numberFieldNodeSchema = nodeSchema.extend({
  type: z.literal("NumberField"),
  ...fieldProperties,
  min: z.number().optional(),
  max: z.number().optional(),
  precision: z.number().optional(),
  start: z.number().optional(),
  step: z.number().optional(),
  default: z.number().optional(),
})

export type NumberFieldNode = z.infer<typeof numberFieldNodeSchema>

// TODO: refine format and default
const dateFieldNodeSchema = nodeSchema.extend({
  type: z.literal("DateField"),
  ...fieldProperties,
  format: z.string().trim().optional(),
  default: z.string().trim().optional(),
})

export type DateFieldNode = z.infer<typeof dateFieldNodeSchema>

// TODO: refine default
const timeFieldNodeSchema = nodeSchema.extend({
  type: z.literal("TimeField"),
  ...fieldProperties,
  withSeconds: z.boolean().optional(),
  default: z.string().trim().optional(),
})

export type TimeFieldNode = z.infer<typeof timeFieldNodeSchema>

const freeTextFieldNodeSchema = nodeSchema.extend({
  type: z.literal("FreeTextField"),
  ...fieldProperties,
  multiline: z.boolean().optional(),
  default: z.string().trim().optional(),
})

export type FreeTextFieldNode = z.infer<typeof freeTextFieldNodeSchema>

const option = z.object({
  label: labelSchema,
  value: labelSchema,
})

export type Option = z.infer<typeof option>

const singleChoiceFieldNodeSchema = nodeSchema.extend({
  type: z.literal("SingleChoiceField"),
  ...fieldProperties,
  variant: z.enum(["radio", "select"]).optional(),
  figure: figureSchema,
  options: z
    .array(option)
    .refine((options) => {
      // check for duplicate values
      const set = new Set()
      for (const opt of options) {
        if (set.has(opt.value)) {
          return false
        }
        set.add(opt.value)
      }
      return true // no duplicates found
    })
    .optional(),
  default: z.string().trim().optional(),
})

export type SingleChoiceFieldNode = z.infer<typeof singleChoiceFieldNodeSchema>

const multipleChoiceFieldNodeSchema = nodeSchema.extend({
  type: z.literal("MultipleChoiceField"),
  ...fieldProperties,
  variant: z.enum(["checkbox", "select"]).optional(),
  figure: figureSchema,
  options: z.array(option).optional(),
  default: z.array(z.string().trim()).optional(),
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

export type LayoutNode = z.infer<typeof nodeSchema> & {
  type: "Layout"
  direction?: "row" | "column"
  nowrap?: boolean
  justify?: "start" | "center" | "end" | "space-between" | "space-around"
  children: (DiscreteFieldNode | HintNode | LayoutNode)[]
}

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

// TODO: rename this to lazy
// eslint-disable-next-line @typescript-eslint/no-use-before-define
const layoutNodeSchema: z.ZodType<LayoutNode> = z.lazy(() => layoutLazyNodeSchema)

// TODO: rename this to non lazy
export const layoutLazyNodeSchema = nodeSchema.extend({
  type: z.literal("Layout"),
  direction: z.enum(["row", "column"]).optional(),
  justify: z.enum(["start", "center", "end", "space-between", "space-around"]).optional(),
  nowrap: z.boolean().optional(),
  children: z.array(z.union([layoutNodeSchema, hintNodeSchema, ...discreteFieldNodeSchemas])),
})

export const layoutChildrenTypes = new Set(
  layoutLazyNodeSchema.shape.children.element.options.map((o) => {
    if (!("shape" in o)) return "Layout"
    return o.shape.type.value
  })
)

const findingFieldNodeSchema = nodeSchema.extend({
  type: z.literal("FindingField"),
  ...fieldProperties,
  default: z.boolean().optional(),
  children: z.array(z.union([layoutNodeSchema, hintNodeSchema, ...discreteFieldNodeSchemas])),
})

export type FindingFieldNode = z.infer<typeof findingFieldNodeSchema>

export const findingFieldChildrenTypes = new Set(
  findingFieldNodeSchema.shape.children.element.options.map((o) => {
    if (!("shape" in o)) return "Layout"
    return o.shape.type.value
  })
)

const groupNodeSchema = nodeSchema.extend({
  type: z.literal("Group"),
  ...fieldProperties,
  fieldId: fieldIdSchema.optional(),
  label: labelSchema.optional(),
  children: z.array(z.union([layoutNodeSchema, hintNodeSchema, ...discreteFieldNodeSchemas])),
})

export type GroupNode = z.infer<typeof groupNodeSchema>

export const groupChildrenTypes = new Set(
  groupNodeSchema.shape.children.element.options.map((o) => {
    if (!("shape" in o)) return "Layout"
    return o.shape.type.value
  })
)

const sectionNodeSchema = nodeSchema.extend({
  type: z.literal("Section"),
  label: labelSchema,
  children: z.array(
    z.union([
      findingFieldNodeSchema,
      groupNodeSchema,
      layoutNodeSchema,
      hintNodeSchema,
      ...discreteFieldNodeSchemas,
    ])
  ),
})

export type SectionNode = z.infer<typeof sectionNodeSchema>

export const sectionChildrenTypes = new Set(
  sectionNodeSchema.shape.children.element.options.map((o) => {
    if (!("shape" in o)) return "Layout"
    return o.shape.type.value
  })
)

export const structureNodeSchema = nodeSchema.extend({
  type: z.literal("Structure"),
  children: z.array(sectionNodeSchema),
})

export type StructureNode = z.infer<typeof structureNodeSchema>

export const structureChildrenTypes = new Set([
  structureNodeSchema.shape.children.element.shape.type.value,
])
