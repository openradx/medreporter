import { StructureElement } from "@medreporter/medtl-schema"
import { ContextData, ElementWrapper } from "@medreporter/medtl-tools"
import { Structure } from "~/components/sr/Structure"
import { SupportedLanguage } from "~/types/general"
import { FieldAdapter } from "./FieldAdapter"
import { FindingAdapter } from "./FindingAdapter"
import { GroupAdapter } from "./GroupAdapter"

interface StructureAdapterProps {
  element?: StructureElement
  data: ContextData
  lng: SupportedLanguage
}

export const StructureAdapter = ({ element, data, lng }: StructureAdapterProps) => {
  const wrapper = element && new ElementWrapper(element)
  const children = wrapper?.getAllChildElements().map(({ element: child }, index) => {
    switch (child.kind) {
      case "Finding": {
        return <FindingAdapter key={index} element={child} {...{ data, lng }} />
      }
      case "Group": {
        return <GroupAdapter key={index} element={child} {...{ data, lng }} />
      }
      default: {
        return <FieldAdapter key={index} element={child} {...{ data, lng }} />
      }
    }
  })

  return <Structure>{children}</Structure>
}
