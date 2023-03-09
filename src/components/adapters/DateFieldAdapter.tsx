import { DateFieldElement } from "@medreporter/medtl-schema"
import {
  ContextData,
  convertRecordToDate,
  createContext,
  ElementWrapper,
} from "@medreporter/medtl-tools"
import { DateField } from "~/components/fields/DateField"
import { SupportedLanguage } from "~/types/general"
import { extractText } from "~/utils/adapter"
import { FieldGraphicsAdapter } from "./FieldGraphicsAdapter"
import { FieldInfoAdapter } from "./FieldInfoAdapter"

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
  const label = extractText(labelEl, data, lng)
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
  const disabled = wrapper.getAttribute("disabled")?.getBooleanValue(context)
  const hidden = wrapper.getAttribute("hidden")?.getBooleanValue(context)

  return <DateField {...{ id, label, extras, defaultValue, disabled, hidden }} />
}
