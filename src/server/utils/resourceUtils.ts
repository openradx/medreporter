import { ModuleDocument } from "@medreporter/medtl-schema"
import { createModuleDraft, DocumentWrapper, renderDraft } from "@medreporter/medtl-tools"
import { Prisma } from "@prisma/client"
import { i18n as I18n } from "i18next"
import figureDraft from "~/images/figure-draft.svg?raw"
import { FigureMetadata } from "~/types/resources"
import { extractText } from "~/utils/adapter"
import { unique } from "~/utils/misc"

export function createFigureDraftSource(i18n: I18n) {
  const { language: lng, t } = i18n

  return renderDraft(figureDraft, {
    lng,
    title: t("Figure.title"),
    description: t("Figure.description"),
    optionTriangle: t("Figure.optionTriangle"),
    optionCircle: t("Figure.optionCircle"),
    optionSquare: t("Figure.optionSquare"),
  })
}

export function createModuleDraftSource(i18n: I18n) {
  const { language: lng, t } = i18n

  return createModuleDraft({
    lng,
    title: t("Module.title"),
    description: t("Module.description"),
    fieldLabel: t("Module.fieldLabel"),
  })
}

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
