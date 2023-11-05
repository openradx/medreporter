import { Visibility } from "@prisma/client"
import { z } from "zod"
import { templateNodeSchema } from "~/schemas/template"
import { outputFormatSchema } from "~/state/displaySlice"
import { structureDataSchema } from "~/state/structureDataSlice"

export const createReportSchema = z.object({
  visibility: z.nativeEnum(Visibility),
  template: templateNodeSchema,
  structureData: structureDataSchema,
  outputFormat: outputFormatSchema,
})

export const updateReportSchema = createReportSchema.partial().extend({
  reportId: z.string(),
})
