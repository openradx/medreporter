import { MeasurementsElement } from "@medreporter/medtl-schema"
import { ContextData, createContext, ElementWrapper } from "@medreporter/medtl-tools"
import { SupportedLanguage } from "~/types/general"
import { convertRecordToMeasurementsData, extractText } from "~/utils/adapter"
import { MeasurementsField } from "../fields/MeasurementsField"
import { FigureAdapter } from "./FigureAdapter"
import { InfoAdapter } from "./InfoAdapter"

interface MeasurementsAdapterProps {
  element: MeasurementsElement
  data: ContextData
  lng: SupportedLanguage
}

export const MeasurementsAdapter = ({ element, data, lng }: MeasurementsAdapterProps) => {
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
  const _default = wrapper.getAttribute("default")?.getValue(context)
  const defaultValue = _default ? convertRecordToMeasurementsData(_default) : undefined
  const disabled = wrapper.getAttribute("disabled")?.getBooleanValue(context)
  const hidden = wrapper.getAttribute("hidden")?.getBooleanValue(context)

  return <MeasurementsField {...{ id, label, extras, defaultValue, disabled, hidden }} />
}
