import { z } from "zod"
import { code } from "./common"

/**
 * Shared field properties
 */
const fieldId = z.string()
const label = z.string()
const hidden = code
const disabled = code
const info = z.string()

const fieldProperties = { fieldId, label, hidden, disabled, info }

/**
 * Fields
 */
const booleanField = z.object({
  type: z.literal("Boolean"),
  ...fieldProperties,
  default: z.boolean(),
})

const numberField = z.object({
  type: z.literal("Number"),
  ...fieldProperties,
  min: z.number(),
  max: z.number(),
  precision: z.number(),
  start: z.number(),
  step: z.number(),
  default: z.number(),
})

const dateField = z.object({
  type: z.literal("Date"),
  ...fieldProperties,
  min: z.coerce.date(),
  max: z.coerce.date(),
  default: z.coerce.date(), // TODO: Really use date?!
})

const timeField = z.object({
  type: z.literal("Time"),
  ...fieldProperties,
  default: z.string(), // TODO: Correct time schema
})

const freeTextField = z.object({
  type: z.literal("FreeText"),
  ...fieldProperties,
  default: z.string(),
})

const option = z.object({
  label: z.string(),
  value: z.string(),
})

const singleChoiceField = z.object({
  type: z.literal("SingleChoice"),
  ...fieldProperties,
  variant: z.enum(["radio", "select"]),
  figure: z.string(),
  options: z.array(option),
})

const multipleChoiceField = z.object({
  type: z.literal("MultipleChoice"),
  ...fieldProperties,
  variant: z.enum(["checkbox", "select"]),
  figure: z.string(),
  options: z.array(option),
})

const measurementsField = z.object({
  type: z.literal("Measurements"),
  ...fieldProperties,
})

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
 * Sectioning
 */
const finding = z.object({
  type: z.literal("Finding"),
  ...fieldProperties,
  children: z.array(z.union(fields)),
})

const group = z.object({
  type: z.literal("Group"),
  ...fieldProperties,
  children: z.array(z.union(fields)),
})

export const structure = z.array(z.union([finding, group, ...fields]))
