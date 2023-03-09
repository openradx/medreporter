import { MultipleChoiceFieldElement } from "@medreporter/medtl-schema"
import { ContextData, createContext, ElementWrapper } from "@medreporter/medtl-tools"
import { EM_DASH } from "~/chars"
import { SupportedLanguage } from "~/types/general"
import { extractText } from "~/utils/adapter"
import { MultipleChoiceField } from "../fields/MultipleChoiceField"
import { FieldOption } from "../fields/fieldTypes"
import { FieldGraphicsAdapter } from "./FieldGraphicsAdapter"
import { FieldInfoAdapter } from "./FieldInfoAdapter"

interface MultipleChoiceFieldAdapterProps {
  element: MultipleChoiceFieldElement
  data: ContextData
  lng: SupportedLanguage
}

export const MultipleChoiceFieldAdapter = ({
  element,
  data,
  lng,
}: MultipleChoiceFieldAdapterProps) => {
  const context = createContext(data, lng)

  const wrapper = new ElementWrapper(element)
  const id = wrapper.getAttribute("id").getStringValue(context)
  const labelEl = wrapper.getFirstChildElement("Label").element
  const label = extractText(labelEl, data, lng)
  const graphicsEl = wrapper.getFirstChildElement("Graphics")?.element
  const infoEl = wrapper.getFirstChildElement("Info")?.element
  const extras = (
    <>
      {graphicsEl && <FieldGraphicsAdapter element={graphicsEl} lng={lng} />}
      {infoEl && <FieldInfoAdapter element={infoEl} {...{ data, lng }} />}
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
  const defaultValue: string[] | undefined = wrapper
    .getAttribute("default")
    ?.getRecordValue(context)
    .values()
    .map(String)

  const disabled = wrapper.getAttribute("disabled")?.getBooleanValue(context)
  const hidden = wrapper.getAttribute("hidden")?.getBooleanValue(context)

  return (
    <MultipleChoiceField
      {...{ id, label, extras, variant, options, defaultValue, disabled, hidden }}
    />
  )
}
