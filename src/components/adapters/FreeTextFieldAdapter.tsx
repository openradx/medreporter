import { FreeTextFieldElement } from "@medreporter/medtl-schema"
import { ContextData, createContext, ElementWrapper } from "@medreporter/medtl-tools"
import { renderToStaticMarkup } from "react-dom/server"
import { SupportedLanguage } from "~/types/general"
import { FreeTextField } from "../fields/FreeTextField"
import { FieldGraphicsAdapter } from "./FieldGraphicsAdapter"
import { FieldInfoAdapter } from "./FieldInfoAdapter"
import { TextContentAdapter } from "./TextContentAdapter"

interface FreeTextFieldAdapterProps {
  element: FreeTextFieldElement
  data: ContextData
  lng: SupportedLanguage
}

export const FreeTextFieldAdapter = ({ element, data, lng }: FreeTextFieldAdapterProps) => {
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
  const defaultValue = wrapper.getAttribute("default")?.getStringValue(context)
  const visible = wrapper.getAttribute("visible")?.getBooleanValue(context)
  const enabled = wrapper.getAttribute("enabled")?.getBooleanValue(context)

  return <FreeTextField {...{ id, label, extras, defaultValue, visible, enabled }} />
}
