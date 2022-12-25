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
  doc: ModuleWrapper
): Prisma.ModuleUpdateArgs["data"]["translations"] {
  const supportedLngs =
    doc
      .getRootElement()
      ?.getFirstChildElement("Locales")
      ?.getChildElements("Locale")
      ?.map((localeEl) => localeEl.getAttribute("lng")?.getValue() ?? "en")
      ?.filter((lng, idx, self) => self.indexOf(lng) === idx) ?? []

  const defaultLng = supportedLngs[0] ?? "en"

  const translations: Prisma.ModuleUpdateArgs["data"]["translations"] = {
    create: supportedLngs.map((lng) => {
      const title =
        doc
          .getRootElement()
          ?.getFirstChildElement("Title")
          ?.getTextContent(createContext({}, lng)) ?? ""
      const description =
        doc
          .getRootElement()
          ?.getFirstChildElement("Description")
          ?.getTextContent(createContext({}, lng)) ?? ""
      return {
        language: lng,
        default: lng === defaultLng,
        title,
        description,
      }
    }),
  }
  return translations
}
