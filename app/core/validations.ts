import { z } from "zod"
import { ReleaseStatus, Visibility } from "db"
import { FormatSchema, MetaInfoSchema } from "./state/reportSlice"
import { StructureDataSchema } from "./state/structureDataSlice"
import { TemplateSchema } from "./state/structureSlice"

export const Pagination = z.object({
  skip: z.number().min(0).default(0),
  take: z.number().min(0).max(1000).default(100),
})

export const CreateModule = z.object({
  name: z.string(),
  multilingual: z.boolean(),
  defaultLanguage: z.string(),
  visibility: z.enum([Visibility.PRIVATE, Visibility.INSTITUTE, Visibility.PUBLIC]),
  categories: z.string().array(),
})

export const UpdateModule = CreateModule.omit({ name: true })
  .extend({
    releaseStatus: z.enum([
      ReleaseStatus.DRAFT,
      ReleaseStatus.PUBLISHED,
      ReleaseStatus.DEPRECIATED,
    ]),
  })
  .partial()

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
