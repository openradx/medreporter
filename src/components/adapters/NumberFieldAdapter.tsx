import { NumberFieldElement } from "@medreporter/medtl-schema"
import { ContextData, createContext, ElementWrapper } from "@medreporter/medtl-tools"
import { NumberField } from "~/components/fields/NumberField"
import { SupportedLanguage } from "~/types/general"
import { extractText } from "~/utils/adapter"
import { FieldGraphicsAdapter } from "./FieldGraphicsAdapter"
import { FieldInfoAdapter } from "./FieldInfoAdapter"

interface NumberFieldAdapterProps {
  element: NumberFieldElement
  data: ContextData
  lng: SupportedLanguage
}

export const NumberFieldAdapter = ({ element, data, lng }: NumberFieldAdapterProps) => {
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
  const disabled = wrapper.getAttribute("disabled")?.getBooleanValue(context)
  const hidden = wrapper.getAttribute("hidden")?.getBooleanValue(context)
  const defaultValue = wrapper.getAttribute("default")?.getNumberValue(context)
  const min = wrapper.getAttribute("min")?.getNumberValue(context)
  const max = wrapper.getAttribute("max")?.getNumberValue(context)
  const precision = wrapper.getAttribute("precision")?.getNumberValue(context)
  const step = wrapper.getAttribute("step")?.getNumberValue(context)
  const startValue = wrapper.getAttribute("start")?.getNumberValue(context)

  return (
    <NumberField
      {...{
        id,
        label,
        extras,
        defaultValue,
        disabled,
        hidden,
        min,
        max,
        precision,
        step,
        startValue,
      }}
    />
  )
}
