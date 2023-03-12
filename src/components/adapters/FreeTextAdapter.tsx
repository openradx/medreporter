import { FreeTextElement } from "@medreporter/medtl-schema"
import { ContextData, createContext, ElementWrapper } from "@medreporter/medtl-tools"
import { SupportedLanguage } from "~/types/general"
import { extractText } from "~/utils/adapter"
import { FreeTextField } from "../fields/FreeTextField"
import { FigureAdapter } from "./FigureAdapter"
import { InfoAdapter } from "./InfoAdapter"

interface FreeTextFieldAdapterProps {
  element: FreeTextElement
  data: ContextData
  lng: SupportedLanguage
}

export const FreeTextAdapter = ({ element, data, lng }: FreeTextFieldAdapterProps) => {
  const context = createContext(data, lng)

  const wrapper = new ElementWrapper(element)
  const id = wrapper.getAttribute("id").getStringValue(context)
  const labelEl = wrapper.getFirstChildElement("Label").element
  const label = extractText(labelEl, data, lng)
  const figureEl = wrapper.getFirstChildElement("Figure")?.element
  const infoEl = wrapper.getFirstChildElement("Info")?.element
  const extras = (
    <>
      {figureEl && <FigureAdapter element={figureEl} lng={lng} />}
      {infoEl && <InfoAdapter element={infoEl} {...{ data, lng }} />}
    </>
  )
  const defaultValue = wrapper.getAttribute("default")?.getStringValue(context)
  const disabled = wrapper.getAttribute("disabled")?.getBooleanValue(context)
  const hidden = wrapper.getAttribute("hidden")?.getBooleanValue(context)

  return <FreeTextField {...{ id, label, extras, defaultValue, disabled, hidden }} />
}
