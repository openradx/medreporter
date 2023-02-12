import { ReleaseStatus, ResourceType, Visibility } from "@prisma/client"
import { TFunction } from "i18next"
import { z } from "zod"
import { getAppConfig } from "~/utils/appConfig"
import { PaginationSchema } from "./common"

const buildResourceNameSchema = (t?: TFunction) =>
  z
    .string()
    .trim()
    .min(3, { message: t?.("formError.tooShort", { min: "3" }) })
    .max(50, { message: t?.("formError.tooLong", { max: "50" }) })
    .regex(
      /^[a-zA-Z][-_a-zA-Z0-9]+$/,
      t && { message: t("formError.invalidChars", { chars: "- _ a-z A-Z 0-9" }) }
    )
    .refine((val) => val !== "new", { message: t?.("formError.reservedKeyword") })

export const buildCreateResourceSchema = (t?: TFunction) =>
  z.object({
    type: z.nativeEnum(ResourceType),
    name: buildResourceNameSchema(t),
    language: z.enum(getAppConfig().structuredReportLanguages),
    visibility: z.nativeEnum(Visibility),
    categories: z.string().array(),
  })

export const FetchOwnResourceSchema = z.object({
  type: z.nativeEnum(ResourceType),
  name: z.string(),
})

export const GetResourceSchema = z.object({
  type: z.nativeEnum(ResourceType),
  author: z.string(), // username of author
  name: z.string(),
})

export const buildUpdateResourceSchema = (t: TFunction) =>
  buildCreateResourceSchema(t)
    .omit({ name: true })
    .extend({ releaseStatus: z.nativeEnum(ReleaseStatus) })
    .partial()

export const GetTranslatedResourcesSchema = PaginationSchema.extend({
  type: z.nativeEnum(ResourceType),
  language: z.string(),
  filter: z.string().optional(),
})
