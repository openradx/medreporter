import { createContext, ModuleWrapper } from "@medreporter/medtl-tools"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import { Prisma } from "db"

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
  module: ModuleWrapper
): Prisma.ModuleUpdateArgs["data"]["translations"] {
  const translator = module.getTranslator()
  const supportedLanguages = translator.getSupportedLanguages()
  const defaultLanguage = translator.getDefaultLanguage()
  const moduleEl = module.getRootElement()
  const translations: Prisma.ModuleUpdateArgs["data"]["translations"] = {
    deleteMany: {},
    create: supportedLanguages.map((lng) => {
      const title = String(moduleEl?.getAttribute("title")?.getValue())
      const description = String(moduleEl?.getAttribute("description")?.getValue() ?? "")
      return {
        language: lng,
        default: lng === defaultLanguage,
        title,
        description,
        tags: {
          create:
            moduleEl
              ?.getFirstChildElement("Tags")
              ?.getChildElements("Tag")
              .map((tag) => ({
                language: lng,
                label: tag.getTextContent(
                  createContext({
                    $trans: (key) => translator.translate(lng, key),
                  })
                ),
              })) ?? [],
        },
      }
    }),
  }
  return translations
}
