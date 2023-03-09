import { MeasurementsFieldElement } from "@medreporter/medtl-schema"
import { ContextData, createContext, ElementWrapper } from "@medreporter/medtl-tools"
import { SupportedLanguage } from "~/types/general"
import { convertRecordToMeasurementsData, extractText } from "~/utils/adapter"
import { MeasurementsField } from "../fields/MeasurementsField"
import { FieldGraphicsAdapter } from "./FieldGraphicsAdapter"
import { FieldInfoAdapter } from "./FieldInfoAdapter"

interface MeasurementsFieldAdapterProps {
  element: MeasurementsFieldElement
  data: ContextData
  lng: SupportedLanguage
}

export const MeasurementsFieldAdapter = ({ element, data, lng }: MeasurementsFieldAdapterProps) => {
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
  const defaultValue = _default ? convertRecordToMeasurementsData(_default) : undefined
  const disabled = wrapper.getAttribute("disabled")?.getBooleanValue(context)
  const hidden = wrapper.getAttribute("hidden")?.getBooleanValue(context)

  return <MeasurementsField {...{ id, label, extras, defaultValue, disabled, hidden }} />
}
