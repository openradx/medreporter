import { Visibility } from "@prisma/client"
import { z } from "zod"
import { structureDataSchema } from "~/schemas/structure"
import { buildTemplateNodeSchema } from "~/schemas/template"
import { outputFormatSchema } from "~/state/displaySlice"

export const createReportSchema = z.object({
  visibility: z.nativeEnum(Visibility),
  template: buildTemplateNodeSchema(),
  structureData: structureDataSchema,
  outputFormat: outputFormatSchema,
})

export const updateReportSchema = createReportSchema.partial().extend({
  reportId: z.string(),
})
