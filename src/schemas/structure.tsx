import { z } from "zod"
import { code, element } from "./common"

/**
 * Shared field properties
 */
const fieldId = z.string()
const label = z.string()
const hidden = code.optional()
const disabled = code.optional()
const info = z.string().optional()

const fieldProperties = { fieldId, label, hidden, disabled, info }

/**
 * Field elements
 */
const booleanField = element.extend({
  type: z.literal("Boolean"),
  ...fieldProperties,
  default: z.boolean().optional(),
})

export type BooleanField = z.infer<typeof booleanField>

const numberField = element.extend({
  type: z.literal("Number"),
  ...fieldProperties,
  min: z.number().optional(),
  max: z.number().optional(),
  precision: z.number().optional(),
  start: z.number().optional(),
  step: z.number().optional(),
  default: z.number().optional(),
})

export type NumberField = z.infer<typeof numberField>

const dateField = element.extend({
  type: z.literal("Date"),
  ...fieldProperties,
  min: z.coerce.date().optional(),
  max: z.coerce.date().optional(),
  default: z.coerce.date().optional(), // TODO: Really use date?!
})

export type DateField = z.infer<typeof dateField>

const timeField = element.extend({
  type: z.literal("Time"),
  ...fieldProperties,
  default: z.string().optional(), // TODO: Correct time schema
})

export type TimeField = z.infer<typeof timeField>

const freeTextField = element.extend({
  type: z.literal("FreeText"),
  ...fieldProperties,
  default: z.string().optional(),
})

export type FreeTextField = z.infer<typeof freeTextField>

const option = element.extend({
  label: z.string(),
  value: z.string(),
})

const singleChoiceField = element.extend({
  type: z.literal("SingleChoice"),
  ...fieldProperties,
  variant: z.enum(["radio", "select"]).optional(),
  figure: z.string().optional(),
  options: z.array(option).optional(),
})

export type SingleChoiceField = z.infer<typeof singleChoiceField>

const multipleChoiceField = element.extend({
  type: z.literal("MultipleChoice"),
  ...fieldProperties,
  variant: z.enum(["checkbox", "select"]).optional(),
  figure: z.string().optional(),
  options: z.array(option).optional(),
})

export type MultipleChoiceField = z.infer<typeof multipleChoiceField>

const measurementsField = element.extend({
  type: z.literal("Measurements"),
  ...fieldProperties,
})

export type MeasurementsField = z.infer<typeof measurementsField>

const fields = [
  booleanField,
  numberField,
  dateField,
  timeField,
  freeTextField,
  singleChoiceField,
  multipleChoiceField,
  measurementsField,
] as const

/**
 * Container properties
 */
const orientation = z.enum(["horizontal", "vertical"]).optional()

/**
 * Container elements
 */
const finding = element.extend({
  type: z.literal("Finding"),
  ...fieldProperties,
  orientation,
  children: z.array(z.union(fields)).optional(),
})

export type Finding = z.infer<typeof finding>

const group = element.extend({
  type: z.literal("Group"),
  ...fieldProperties,
  orientation,
  children: z.array(z.union(fields)).optional(),
})

export type Group = z.infer<typeof group>

const layout = element.extend({
  type: z.literal("Layout"),
  orientation,
  children: z.array(z.union([finding, group, ...fields])).optional(),
})

export type Layout = z.infer<typeof layout>

export const structure = z.array(z.union([finding, group, layout, ...fields]))

export type StructureElement =
  | BooleanField
  | NumberField
  | DateField
  | TimeField
  | FreeTextField
  | SingleChoiceField
  | MultipleChoiceField
  | MeasurementsField
  | Finding
  | Group
  | Layout
