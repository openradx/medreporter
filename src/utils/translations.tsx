import { ModuleElement } from "@medreporter/medtl-schema"
import { ElementWrapper } from "@medreporter/medtl-tools"
import { Prisma } from "@prisma/client"
import { renderToStaticMarkup } from "react-dom/server"
import { TextContentAdapter } from "~/components/adapters/TextContentAdapter"

export function buildModuleTranslationsArgs(
  element: ModuleElement
): Prisma.ModuleUpdateArgs["data"]["translations"] {
  const wrapper = new ElementWrapper(element)
  const supportedLngs =
    wrapper
      ?.getFirstChildElement("Locales")
      ?.getChildElements("Locale")
      ?.map((localeEl) => localeEl.getAttribute("lng")?.getValue() ?? "en")
      ?.filter((lng, idx, self) => self.indexOf(lng) === idx) ?? []

  const defaultLng = supportedLngs[0] ?? "en"

  const translations: Prisma.ModuleUpdateArgs["data"]["translations"] = {
    create: supportedLngs.map((lng) => {
      const titleEl = wrapper.getFirstChildElement("Title").element
      const title = renderToStaticMarkup(
        <TextContentAdapter element={titleEl} data={{}} lng={lng} />
      )
      const descriptionEl = wrapper.getFirstChildElement("Description")?.element
      const description = descriptionEl
        ? renderToStaticMarkup(<TextContentAdapter element={descriptionEl} data={{}} lng={lng} />)
        : ""

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
