import { ReleaseStatus, Visibility } from "@prisma/client"
import { TFunction } from "i18next"
import { z } from "zod"
import { FormatSchema, MetaInfoSchema } from "~/state/reportSlice"
import { StructureDataSchema } from "~/state/structureDataSlice"
import { TemplateSchema } from "~/state/structureSlice"
import { getAppConfig } from "~/utils/appConfig"

export const PaginationSchema = z.object({
  skip: z.number().min(0).default(0),
  take: z.number().min(0).max(1000).default(100),
})

export const buildCreateModuleSchema = (t?: TFunction) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(3, { message: t?.("formError.tooShort", { min: "3" }) })
      .max(50, { message: t?.("formError.tooLong", { max: "50" }) })
      .regex(
        /^[a-zA-Z][-_a-zA-Z0-9]+$/,
        t && { message: t("formError.invalidChars", { chars: "- _ a-z A-Z 0-9" }) }
      )
      .refine((val) => val !== "new", { message: t?.("formError.reservedKeyword") }),
    multilingual: z.boolean(),
    defaultLanguage: z.enum(getAppConfig().structuredReportLanguages),
    visibility: z.enum([Visibility.PRIVATE, Visibility.INSTITUTE, Visibility.PUBLIC]),
    categories: z.string().array(),
  })

export const CreateReportSchema = z.object({
  visibility: z.nativeEnum(Visibility),
  template: TemplateSchema,
  structureData: StructureDataSchema,
  reportFormat: FormatSchema,
  metaInfos: z.array(MetaInfoSchema),
})

export const FetchOwnModuleSchema = z.object({
  name: z.string(),
})

export const GetCategoriesSchema = PaginationSchema.extend({
  language: z.string(),
  filter: z.string().optional(),
  usedByModule: z.boolean().default(false),
  usedByTemplate: z.boolean().default(false),
})

export const GetModuleSchema = z.object({
  username: z.string(),
  moduleName: z.string(),
})

export const buildUpdateModuleSchema = (t: TFunction) =>
  buildCreateModuleSchema(t)
    .omit({ name: true })
    .extend({
      releaseStatus: z.enum([
        ReleaseStatus.DRAFT,
        ReleaseStatus.PUBLISHED,
        ReleaseStatus.DEPRECIATED,
      ]),
    })
    .partial()

export const UpdateReportSchema = CreateReportSchema.partial().extend({
  reportId: z.string(),
})
