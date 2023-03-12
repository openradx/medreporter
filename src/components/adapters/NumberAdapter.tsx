import { NumberElement } from "@medreporter/medtl-schema"
import { ContextData, createContext, ElementWrapper } from "@medreporter/medtl-tools"
import { NumberField } from "~/components/fields/NumberField"
import { SupportedLanguage } from "~/types/general"
import { extractText } from "~/utils/adapter"
import { FigureAdapter } from "./FigureAdapter"
import { InfoAdapter } from "./InfoAdapter"

interface NumberAdapterProps {
  element: NumberElement
  data: ContextData
  lng: SupportedLanguage
}

export const NumberAdapter = ({ element, data, lng }: NumberAdapterProps) => {
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
