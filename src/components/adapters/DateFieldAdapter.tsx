import { DateFieldElement } from "@medreporter/medtl-schema"
import {
  ContextData,
  convertRecordToDate,
  createContext,
  ElementWrapper,
} from "@medreporter/medtl-tools"
import { renderToStaticMarkup } from "react-dom/server"
import { DateField } from "~/components/fields/DateField"
import { SupportedLanguage } from "~/types/general"
import { FieldGraphicsAdapter } from "./FieldGraphicsAdapter"
import { FieldInfoAdapter } from "./FieldInfoAdapter"
import { TextContentAdapter } from "./TextContentAdapter"

interface DateFieldAdapterProps {
  element: DateFieldElement
  data: ContextData
  lng: SupportedLanguage
}

export const DateFieldAdapter = ({ element, data, lng }: DateFieldAdapterProps) => {
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
  const _default = wrapper.getAttribute("default")?.getValue(context)
  const defaultValue = _default ? convertRecordToDate(_default).toISOString() : undefined
  const visible = wrapper.getAttribute("visible")?.getBooleanValue(context)
  const enabled = wrapper.getAttribute("enabled")?.getBooleanValue(context)

  return <DateField {...{ id, label, extras, defaultValue, visible, enabled }} />
}
