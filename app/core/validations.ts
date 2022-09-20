import appConfig from "app.config"
import { TFunction } from "i18next"
import { z } from "zod"
import { ReleaseStatus, Visibility } from "db"
import { FormatSchema, MetaInfoSchema } from "./state/reportSlice"
import { StructureDataSchema } from "./state/structureDataSlice"
import { TemplateSchema } from "./state/structureSlice"

export const Pagination = z.object({
  skip: z.number().min(0).default(0),
  take: z.number().min(0).max(1000).default(100),
})

export const buildCreateModule = (t?: TFunction) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(3, t && { message: t("formError.tooShort", { min: "3" }) })
      .max(50, t && { message: t("formError.tooLong", { max: "50" }) })
      .regex(
        /^[a-zA-Z][-_a-zA-Z0-9]+$/,
        t && { message: t("formError.invalidChars", { chars: "- _ a-z A-Z 0-9" }) }
      ),
    multilingual: z.boolean(),
    defaultLanguage: z.enum(appConfig.structuredReportLanguages),
    visibility: z.enum([Visibility.PRIVATE, Visibility.INSTITUTE, Visibility.PUBLIC]),
    categories: z.string().array(),
  })

export const CreateReport = z.object({
  visibility: z.nativeEnum(Visibility),
  template: TemplateSchema,
  structureData: StructureDataSchema,
  reportFormat: FormatSchema,
  metaInfos: z.array(MetaInfoSchema),
})

export const FetchOwnModule = z.object({
  name: z.string(),
})

export const GetCategories = Pagination.extend({
  language: z.string(),
  filter: z.string().optional(),
  usedByModule: z.boolean().default(false),
  usedByTemplate: z.boolean().default(false),
})

export const buildUpdateModule = (t: TFunction) =>
  buildCreateModule(t)
    .omit({ name: true })
    .extend({
      releaseStatus: z.enum([
        ReleaseStatus.DRAFT,
        ReleaseStatus.PUBLISHED,
        ReleaseStatus.DEPRECIATED,
      ]),
    })
    .partial()

export const UpdateReport = CreateReport.partial().extend({
  reportId: z.string(),
})
