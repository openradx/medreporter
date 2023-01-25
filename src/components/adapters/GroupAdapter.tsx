import { GroupElement } from "@medreporter/medtl-schema"
import { ContextData, ElementWrapper } from "@medreporter/medtl-tools"
import { renderToStaticMarkup } from "react-dom/server"
import { SupportedLanguage } from "~/types/general"
import { Group } from "../fields/Group"
import { FieldAdapter } from "./FieldAdapter"
import { TextContentAdapter } from "./TextContentAdapter"

interface GroupAdapterProps {
  element: GroupElement
  data: ContextData
  lng: SupportedLanguage
}

export const GroupAdapter = ({ element, data, lng }: GroupAdapterProps) => {
  const wrapper = new ElementWrapper(element)
  const labelEl = wrapper.getFirstChildElement("Label").element
  const label = renderToStaticMarkup(<TextContentAdapter element={labelEl} {...{ data, lng }} />)

  const children = wrapper.getAllChildElements().map(({ element: child }) => {
    if (child.kind === "Label") return null

    return <FieldAdapter element={child} {...{ data, lng }} />
  })

  return <Group label={label}>{children}</Group>
}
