import { MultipleChoiceFieldElement } from "@medreporter/medtl-schema"
import { ContextData, createContext, ElementWrapper } from "@medreporter/medtl-tools"
import { renderToStaticMarkup } from "react-dom/server"
import { EM_DASH } from "~/chars"
import { SupportedLanguage } from "~/types/general"
import { MultipleChoiceField } from "../fields/MultipleChoiceField"
import { FieldOption } from "../fields/fieldTypes"
import { FieldGraphicsAdapter } from "./FieldGraphicsAdapter"
import { FieldInfoAdapter } from "./FieldInfoAdapter"
import { TextContentAdapter } from "./TextContentAdapter"

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
  const label = renderToStaticMarkup(<TextContentAdapter element={labelEl} {...{ data, lng }} />)
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
    const optionLabel = renderToStaticMarkup(
      <TextContentAdapter element={optionEl.element} {...{ data, lng }} />
    )
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
  const visible = wrapper.getAttribute("visible")?.getBooleanValue(context)
  const enabled = wrapper.getAttribute("enabled")?.getBooleanValue(context)

  return (
    <MultipleChoiceField
      {...{ id, label, extras, variant, options, defaultValue, visible, enabled }}
    />
  )
}
