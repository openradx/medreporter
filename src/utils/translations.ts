import { createContext, ModuleWrapper } from "@medreporter/medtl-tools"
import { Prisma } from "@prisma/client"

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
