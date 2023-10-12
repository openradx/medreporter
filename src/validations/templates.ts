import { ReleaseStatus, Visibility } from "@prisma/client"
import { TFunction } from "i18next"
import { z } from "zod"
import { getAppConfig } from "~/utils/appConfig"
import { PaginationSchema } from "./common"

const buildTemplateSlugSchema = (t?: TFunction) =>
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

export const buildCreateTemplateSchema = (t?: TFunction) =>
  z.object({
    slug: buildTemplateSlugSchema(t),
    locale: z.enum(getAppConfig().supportedLanguages),
    tags: z.string().array(),
    visibility: z.nativeEnum(Visibility),
  })

export const UpdateTemplateSchema = z.object({
  id: z.string(),
  document: z.any(), // TODO: add proper schema
  tags: z.string().array().optional(),
  visibility: z.nativeEnum(Visibility).optional(),
  releaseStatus: z.nativeEnum(ReleaseStatus).optional(),
})

export const FetchOwnTemplateSchema = z.object({
  slug: z.string(),
})

export const GetTemplateSchema = z.object({
  author: z.string(), // username of author
  slug: z.string(),
})

export const GetTemplatesSchema = PaginationSchema.extend({
  locale: z.string().optional(),
  filter: z.string().optional(),
})
