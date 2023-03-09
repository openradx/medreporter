import { ModuleDocument } from "@medreporter/medtl-schema"
import { DocumentWrapper } from "@medreporter/medtl-tools"
import { Prisma } from "@prisma/client"
import { FigureMetadata } from "~/types/resources"
import { extractText } from "~/utils/adapter"
import { unique } from "~/utils/misc"

export function createFigureTranslationsUpdateArgs(
  meta: FigureMetadata
): Prisma.ResourceUpdateArgs["data"]["translations"] {
  return {
    create: meta.lngs.map((lng) => ({
      default: false,
      language: lng,
      title: meta.title[lng],
      description: meta.description[lng],
    })),
  }
}

export function createModuleTranslationsUpdateArgs(
  document: ModuleDocument
): Prisma.ResourceUpdateArgs["data"]["translations"] {
  const wrapper = new DocumentWrapper(document).getRootElement()
  const supportedLngs = unique(
    wrapper
      ?.getAttribute("lngs")
      ?.getStringValue()
      .split(",")
      .map((lng) => lng.trim()) ?? ["en"]
  )

  const defaultLng = supportedLngs[0] ?? "en"

  const translations: Prisma.ResourceUpdateArgs["data"]["translations"] = {
    create: supportedLngs.map((lng) => {
      const titleEl = wrapper?.getFirstChildElement("Title").element
      const title = titleEl ? extractText(titleEl, {}, lng) : "Untitled"
      const descriptionEl = wrapper?.getFirstChildElement("Description")?.element
      const description = descriptionEl ? extractText(descriptionEl, {}, lng) : ""

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
