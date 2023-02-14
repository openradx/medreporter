import { GroupElement } from "@medreporter/medtl-schema"
import { ContextData, ElementWrapper } from "@medreporter/medtl-tools"
import { SupportedLanguage } from "~/types/general"
import { extractText } from "~/utils/adapter"
import { Group } from "../fields/Group"
import { FieldAdapter } from "./FieldAdapter"

interface GroupAdapterProps {
  element: GroupElement
  data: ContextData
  lng: SupportedLanguage
}

export const GroupAdapter = ({ element, data, lng }: GroupAdapterProps) => {
  const wrapper = new ElementWrapper(element)
  const labelEl = wrapper.getFirstChildElement("Label").element
  const label = extractText(labelEl, data, lng)

  const children = wrapper.getAllChildElements().map(({ element: child }) => {
    if (child.kind === "Label") return null

    return <FieldAdapter element={child} {...{ data, lng }} />
  })

  return <Group label={label}>{children}</Group>
}
