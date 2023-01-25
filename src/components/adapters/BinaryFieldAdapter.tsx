import { BinaryFieldElement } from "@medreporter/medtl-schema"
import { ContextData, createContext, ElementWrapper } from "@medreporter/medtl-tools"
import { renderToStaticMarkup } from "react-dom/server"
import { SupportedLanguage } from "~/types/general"
import { BinaryField } from "../fields/BinaryField"
import { FieldGraphicsAdapter } from "./FieldGraphicsAdapter"
import { FieldInfoAdapter } from "./FieldInfoAdapter"
import { TextContentAdapter } from "./TextContentAdapter"

interface BinaryFieldAdapterProps {
  element: BinaryFieldElement
  data: ContextData
  lng: SupportedLanguage
}

export const BinaryFieldAdapter = ({ element, data, lng }: BinaryFieldAdapterProps) => {
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
  const defaultValue = wrapper.getAttribute("default")?.getBooleanValue(context)
  const visible = wrapper.getAttribute("visible")?.getBooleanValue(context)
  const enabled = wrapper.getAttribute("enabled")?.getBooleanValue(context)

  return <BinaryField {...{ id, label, extras, defaultValue, visible, enabled }} />
}
