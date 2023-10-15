import appConfig from "app.config"
import { FigureMetadata } from "~/types/resources"

export interface TranslatedFigureMetadata {
  title: string
  description: string
  options: { [id: string]: string }
}

function extractText(el: Element, lng: string, ns: string = "med"): string {
  const transName = ns ? `${ns}:Trans` : "Trans"

  let text = ""
  for (const node of el.childNodes) {
    if (node.nodeType === node.TEXT_NODE) {
      text += node.textContent
    }
    if (node.nodeName === transName) {
      const transEl = node as Element
      const transLng = transEl.getAttribute("lng")
      if (transLng === lng) {
        text += transEl.textContent
      }
    }
  }

  return text.trim()
}

export function extractMetadata(doc: Document, ns: string = "med"): FigureMetadata {
  let metadataEl = doc.querySelector("metadata")
  if (!metadataEl) {
    metadataEl = doc.createElementNS("http://www.w3.org/2000/svg", "metadata")
  }

  ns = `${ns}\\:`
  let figureEl = metadataEl.querySelector(`${ns}Figure`)
  if (!figureEl) {
    figureEl = metadataEl.querySelector("Figure")
    ns = ""
  }

  const lngs = figureEl
    ?.getAttribute("lngs")
    ?.split(",")
    .map((lng) => lng.trim()) ?? ["en"]

  const meta: FigureMetadata = {
    lngs,
    title: {},
    description: {},
    options: {},
  }

  lngs.forEach((lng) => {
    const titleEl = figureEl?.querySelector(`${ns}Title`)
    meta.title[lng] = titleEl ? extractText(titleEl, lng) : "Untitled"

    const descriptionEl = figureEl?.querySelector(`${ns}Description`)
    meta.description[lng] = descriptionEl ? extractText(descriptionEl, lng) : ""

    const optionEls = figureEl?.querySelectorAll(`${ns}Option`) ?? []
    for (const optionEl of optionEls) {
      const optionId = optionEl.getAttribute("id")
      if (!optionId) continue

      if (!(optionId in meta.options)) meta.options[optionId] = {}
      meta.options[optionId][lng] = extractText(optionEl, lng)
    }
  })

  return meta
}

export function translateMetadata(meta: FigureMetadata, lng: string): TranslatedFigureMetadata {
  const getTranslation = (prop: { [lng: string]: string }, defaultTranslation = ""): string => {
    let trans = prop[lng]
    if (!trans) {
      for (const fallbackLng of appConfig.fallbackLanguages) {
        trans = prop[fallbackLng]
        if (trans) break
      }
    }
    return trans ?? Object.values(prop)[0] ?? defaultTranslation
  }

  const title = getTranslation(meta.title, "Untitled")
  const description = getTranslation(meta.description)
  const options = Object.fromEntries(
    Object.entries(meta.options)
      .map(([id, option]) => [id, getTranslation(option)])
      .filter(([_id, option]) => !!option)
  )

  return {
    title,
    description,
    options,
  }
}
