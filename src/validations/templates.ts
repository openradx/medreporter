import { ReleaseStatus, Visibility } from "@prisma/client"
import { TFunction } from "i18next"
import { z } from "zod"
import { PaginationSchema } from "./common"

export const buildLocaleSchema = (t?: TFunction) =>
  z.string().refine((value) => /^\w\w(-\w\w)?$/.test(value), t && t("formError.invalidLocale"))

const buildTemplateNameSchema = (t?: TFunction) =>
  z
    .string()
    .trim()
    .min(3, { message: t && t("formError.tooShort", { min: "3" }) })
    .max(50, { message: t && t("formError.tooLong", { max: "50" }) })
    .regex(
      /^[a-zA-Z][-_a-zA-Z0-9]+$/,
      t && { message: t("formError.invalidChars", { chars: "- _ a-z A-Z 0-9" }) }
    )
    .refine((val) => val !== "new", { message: t && t("formError.reservedKeyword") })

export const buildCreateTemplateSchema = (t?: TFunction) =>
  z.object({
    name: buildTemplateNameSchema(t),
    locale: buildLocaleSchema(t),
    tags: z.string().array(),
    visibility: z.nativeEnum(Visibility),
  })

// TODO: allow to update locale and maybe name
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
  username: z.string(),
  slug: z.string(),
})

export const GetTemplatesSchema = PaginationSchema.extend({
  language: z.string().optional(),
  filter: z.string().optional(),
})
