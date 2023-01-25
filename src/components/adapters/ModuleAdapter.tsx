import { ModuleElement } from "@medreporter/medtl-schema"
import { ContextData, ElementWrapper } from "@medreporter/medtl-tools"
import { renderToStaticMarkup } from "react-dom/server"
import { Module } from "~/components/sr/Module"
import { SupportedLanguage } from "~/types/general"
import { createModuleId } from "~/utils/identifiers"
import { StructureAdapter } from "./StructureAdapter"
import { TextContentAdapter } from "./TextContentAdapter"

interface ModuleAdapterProps {
  element: ModuleElement
  data: ContextData
  lng: SupportedLanguage
}

export const ModuleAdapter = ({ element, data, lng }: ModuleAdapterProps) => {
  const moduleId = createModuleId()

  const wrapper = new ElementWrapper(element)
  const titleEl = wrapper.getFirstChildElement("Title").element
  const title = renderToStaticMarkup(<TextContentAdapter element={titleEl} data={{}} lng={lng} />)
  const structure = wrapper.getFirstChildElement("Structure")?.element

  return (
    <Module id={moduleId} title={title}>
      <StructureAdapter element={structure} {...{ data, lng }} />
    </Module>
  )
}
