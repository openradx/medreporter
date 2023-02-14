import { ModuleElement } from "@medreporter/medtl-schema"
import { ContextData, ElementWrapper } from "@medreporter/medtl-tools"
import { Module } from "~/components/sr/Module"
import { SupportedLanguage } from "~/types/general"
import { extractText } from "~/utils/adapter"
import { createModuleId } from "~/utils/identifiers"
import { StructureAdapter } from "./StructureAdapter"

interface ModuleAdapterProps {
  element: ModuleElement
  data: ContextData
  lng: SupportedLanguage
}

export const ModuleAdapter = ({ element, data, lng }: ModuleAdapterProps) => {
  const moduleId = createModuleId()

  const wrapper = new ElementWrapper(element)
  const titleEl = wrapper.getFirstChildElement("Title").element
  const title = extractText(titleEl, data, lng)
  const structure = wrapper.getFirstChildElement("Structure")?.element

  return (
    <Module id={moduleId} title={title}>
      <StructureAdapter element={structure} {...{ data, lng }} />
    </Module>
  )
}
