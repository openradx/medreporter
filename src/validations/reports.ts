import { Visibility } from "@prisma/client"
import { z } from "zod"
import { FormatSchema, MetaInfoSchema } from "~/state/reportSlice"
import { StructureDataSchema } from "~/state/structureDataSlice"
import { TemplateSchema } from "~/state/structureSlice"

export const CreateReportSchema = z.object({
  visibility: z.nativeEnum(Visibility),
  template: TemplateSchema,
  structureData: StructureDataSchema,
  reportFormat: FormatSchema,
  metaInfos: z.array(MetaInfoSchema),
})

export const UpdateReportSchema = CreateReportSchema.partial().extend({
  reportId: z.string(),
})
