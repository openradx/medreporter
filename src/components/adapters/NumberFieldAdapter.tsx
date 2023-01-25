import { NumberFieldElement } from "@medreporter/medtl-schema"
import { ContextData, createContext, ElementWrapper } from "@medreporter/medtl-tools"
import { renderToStaticMarkup } from "react-dom/server"
import { NumberField } from "~/components/fields/NumberField"
import { SupportedLanguage } from "~/types/general"
import { FieldGraphicsAdapter } from "./FieldGraphicsAdapter"
import { FieldInfoAdapter } from "./FieldInfoAdapter"
import { TextContentAdapter } from "./TextContentAdapter"

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
  const label = renderToStaticMarkup(<TextContentAdapter element={labelEl} {...{ data, lng }} />)
  const graphicsEl = wrapper.getFirstChildElement("Graphics")?.element
  const infoEl = wrapper.getFirstChildElement("Info")?.element
  const extras = (
    <>
      {graphicsEl && <FieldGraphicsAdapter element={graphicsEl} lng={lng} />}
      {infoEl && <FieldInfoAdapter element={infoEl} {...{ data, lng }} />}
    </>
  )
  const visible = wrapper.getAttribute("visible")?.getBooleanValue(context)
  const enabled = wrapper.getAttribute("enabled")?.getBooleanValue(context)
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
        min,
        max,
        precision,
        step,
        startValue,
        visible,
        enabled,
      }}
    />
  )
}
