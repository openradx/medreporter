import { ModuleDocument } from "@medreporter/medtl-schema"
import { createModuleDraft, DocumentWrapper, renderDraft } from "@medreporter/medtl-tools"
import { Prisma } from "@prisma/client"
import { i18n as I18n } from "i18next"
import { extractText } from "~/utils/adapter"
import { unique } from "~/utils/misc"

export type ResourceTranslationsUpdateArgs = Prisma.ResourceUpdateArgs["data"]["translations"]

export function createFigureSource(i18n: I18n) {
  const { language: lng, t } = i18n

  // TODO:
  return renderDraft("", {})
}

export function createModuleSource(i18n: I18n) {
  const { language: lng, t } = i18n

  return createModuleDraft({
    lng,
    title: t("Module.title"),
    description: t("Module.description"),
    fieldLabel: t("Module.fieldLabel"),
  })
}

export function createFigureTranslations(
  document: Document,
  namespace: string = "med"
): ResourceTranslationsUpdateArgs {
  let metadataEl = document.querySelector("metadata")
  if (!metadataEl) {
    metadataEl = document.createElementNS("http://www.w3.org/2000/svg", "metadata")
  }

  let ns = `${namespace}\\:`

  let medReporterEl = metadataEl.querySelector(`${ns}MedReporter`)
  if (!medReporterEl) {
    medReporterEl = metadataEl.querySelector("MedReporter")
    ns = ""
  }

  const titleEl = medReporterEl?.querySelector(`${ns}Title`)
  const transEls = titleEl?.querySelectorAll(`${ns}Trans`)

  if (!transEls) {
    return {
      create: {
        default: true,
        language: "en",
        title: "Untitled",
        description: "",
      },
    }
  }

  return {
    create: Array.from(transEls.values()).map((transEl) => {
      const lng = transEl.getAttribute("lng") ?? "en"
      const title = transEl.textContent ?? "Untitled"
      return { default: false, language: lng, title, description: "" }
    }),
  }
}

export function createModuleTranslations(
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
