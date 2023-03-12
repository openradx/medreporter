import { FigureElement } from "@medreporter/medtl-schema"
import { ElementWrapper } from "@medreporter/medtl-tools"
import { SupportedLanguage } from "~/types/general"

interface FieldGraphicsAdapterProps {
  element: FigureElement
  lng: SupportedLanguage
}

export const FigureAdapter = ({ element, lng }: FieldGraphicsAdapterProps) => {
  const wrapper = new ElementWrapper(element)
  wrapper.getAttribute("source")
  // eslint-disable-next-line no-console
  console.log(lng)

  // TODO:
  return null
}
