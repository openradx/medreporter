import { SingleChoiceElement } from "@medreporter/medtl-schema"
import { ContextData, createContext, ElementWrapper } from "@medreporter/medtl-tools"
import { EM_DASH } from "~/chars"
import { SupportedLanguage } from "~/types/general"
import { extractText } from "~/utils/adapter"
import { SingleChoiceField } from "../fields/SingleChoiceField"
import { FieldOption } from "../fields/fieldTypes"
import { FigureAdapter } from "./FigureAdapter"
import { InfoAdapter } from "./InfoAdapter"

interface SingleChoiceAdapterProps {
  element: SingleChoiceElement
  data: ContextData
  lng: SupportedLanguage
}

export const SingleChoiceAdapter = ({ element, data, lng }: SingleChoiceAdapterProps) => {
  const context = createContext(data, lng)

  const wrapper = new ElementWrapper(element)
  const id = wrapper.getAttribute("id").getStringValue(context)
  const labelEl = wrapper.getFirstChildElement("Label").element
  const label = extractText(labelEl, data, lng)
  const graphicsEl = wrapper.getFirstChildElement("Figure")?.element
  const infoEl = wrapper.getFirstChildElement("Info")?.element
  const extras = (
    <>
      {graphicsEl && <FigureAdapter element={graphicsEl} lng={lng} />}
      {infoEl && <InfoAdapter element={infoEl} {...{ data, lng }} />}
    </>
  )
  const variant = wrapper.getAttribute("variant")?.getStringValue()
  const optionEls = wrapper.getChildElements("Option")
  const options: FieldOption[] = optionEls.map((optionEl) => {
    const optionValue = optionEl.getAttribute("value")?.getStringValue()
    const optionLabel = extractText(optionEl.element, data, lng)
    return {
      label: optionLabel || optionValue || EM_DASH,
      value: optionValue || optionLabel,
    }
  })
  const defaultValue = wrapper.getAttribute("default")?.getStringValue(context)
  const disabled = wrapper.getAttribute("disabled")?.getBooleanValue(context)
  const hidden = wrapper.getAttribute("hidden")?.getBooleanValue(context)

  return (
    <SingleChoiceField
      {...{ id, label, extras, variant, options, defaultValue, disabled, hidden }}
    />
  )
}
