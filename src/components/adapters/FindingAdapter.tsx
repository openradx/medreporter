import { FindingElement } from "@medreporter/medtl-schema"
import { ContextData, createContext, ElementWrapper } from "@medreporter/medtl-tools"
import { SupportedLanguage } from "~/types/general"
import { extractText } from "~/utils/adapter"
import { FindingField } from "../fields/FindingField"
import { FieldAdapter } from "./FieldAdapter"
import { GroupAdapter } from "./GroupAdapter"

interface FindingAdapterProps {
  element: FindingElement
  data: ContextData
  lng: SupportedLanguage
}

export const FindingAdapter = ({ element, data, lng }: FindingAdapterProps) => {
  const wrapper = new ElementWrapper(element)
  const context = createContext(data, lng)
  const id = wrapper.getAttribute("id").getStringValue(context)
  const labelEl = wrapper.getFirstChildElement("Label").element
  const label = extractText(labelEl, data, lng)
  const defaultValue = wrapper.getAttribute("default")?.getBooleanValue(context)
  const disabled = wrapper.getAttribute("disabled")?.getBooleanValue(context)
  const hidden = wrapper.getAttribute("hidden")?.getBooleanValue(context)

  // TODO: Link element

  const children = wrapper.getAllChildElements().map(({ element: child }) => {
    if (child.kind === "Label" || child.kind === "Link") return null

    if (child.kind === "Group") {
      return <GroupAdapter element={child} {...{ data, lng }} />
    }

    return <FieldAdapter element={child} {...{ data, lng }} />
  })

  return <FindingField {...{ id, label, defaultValue, disabled, hidden }}>{children}</FindingField>
}
