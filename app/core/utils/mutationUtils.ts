import { ModuleDocument } from "@medreporter/medtl-schema"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import { Prisma } from "db"
import { getLanguages } from "./medtUtils"

type ErrorMeta = { target?: string[] }

// For codes see https://www.prisma.io/docs/reference/api-reference/error-reference
function isPrismaError(error: unknown, code: string, field: string) {
  if ("code" in (error as any) && "meta" in (error as any)) {
    const prismaError = error as PrismaClientKnownRequestError
    const inField = (prismaError.meta as ErrorMeta).target?.includes(field)
    if (code === "P2002" && inField) {
      return true
    }
  }
  return false
}

export function uniqueConstraintFailed(error: any, field: string) {
  return isPrismaError(error, "P2002", field)
}

export function buildModuleTranslationsArgs(
  document: ModuleDocument
): Prisma.ModuleUpdateArgs["data"]["translations"] {
  const languages = getLanguages(document)

  const ctx = getDefaultContext()

  const module = document.getRootElement()
  const translator = document.getTranslator()
  const defaultLanguage = translator.getDefaultLanguage()
  const translations: Prisma.ModuleUpdateArgs["data"]["translations"] = {
    deleteMany: {},
    create: languages.map((lng, index) => {
      let isDefaultLng = false
      if (defaultLanguage && defaultLanguage in languages) {
        if (defaultLanguage === lng) {
          isDefaultLng = true
        }
      } else {
        if (index === 0) {
          isDefaultLng = true
        }
      }

      return {
        language: lng,
        default: isDefaultLng,
        title: module.getAttributeValue("title", "string", ctx, lng) ?? "",
        description: module.getAttributeValue("description", "string", ctx, lng) ?? "",
        tags: {
          create: module
            .getChildElement("Tags")
            ?.getChildElements("Tag")
            .map((tag) => ({ language: lng, label: tag.getTextContent(ctx, lng) })),
        },
      }
    }),
  }
  return translations
}
