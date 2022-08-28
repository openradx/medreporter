import { z } from "zod"
import { Visibility } from "db"
import { FormatSchema, MetaInfoSchema } from "../state/reportSlice"
import { StructureDataSchema } from "./state/structureDataSlice"
import { TemplateSchema } from "./state/templateSlice"

export const CreateModule = z.object({
  sourceCode: z.string(),
  releaseStatus: z.enum(["DRAFT", "UNPUBLISHED", "PUBLISHED", "DEPRECIATED"]),
})

export const UpdateModule = CreateModule.partial().extend({
  moduleId: z.string(),
})

export const CreateReport = z.object({
  visibility: z.nativeEnum(Visibility),
  template: TemplateSchema,
  structureData: StructureDataSchema,
  reportFormat: FormatSchema,
  metaInfos: z.array(MetaInfoSchema),
})

export const UpdateReport = CreateReport.partial().extend({
  reportId: z.string(),
})
