import { ModuleDocument } from "@medreporter/medtl-schema"
import { DocumentWrapper } from "@medreporter/medtl-tools"
import { Prisma } from "@prisma/client"
import { renderToStaticMarkup } from "react-dom/server"
import { TextContentAdapter } from "~/components/adapters/TextContentAdapter"
import { unique } from "./misc"

export function buildFigureTranslationArgs(
  document: Document,
  namespace: string = "med"
): Prisma.FigureUpdateArgs["data"]["translations"] {
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

export function buildModuleTranslationsArgs(
  document: ModuleDocument
): Prisma.ModuleUpdateArgs["data"]["translations"] {
  const wrapper = new DocumentWrapper(document).getRootElement()
  const supportedLngs = unique(
    wrapper
      ?.getAttribute("lngs")
      ?.getStringValue()
      .split(",")
      .map((lng) => lng.trim()) ?? ["en"]
  )

  const defaultLng = supportedLngs[0] ?? "en"

  const translations: Prisma.ModuleUpdateArgs["data"]["translations"] = {
    create: supportedLngs.map((lng) => {
      const titleEl = wrapper?.getFirstChildElement("Title").element
      const title = titleEl
        ? renderToStaticMarkup(<TextContentAdapter element={titleEl} data={{}} lng={lng} />)
        : "Untitled"
      const descriptionEl = wrapper?.getFirstChildElement("Description")?.element
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
