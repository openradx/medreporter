import { FindingElement } from "@medreporter/medtl-schema"
import { ContextData, ElementWrapper } from "@medreporter/medtl-tools"
import { renderToStaticMarkup } from "react-dom/server"
import { SupportedLanguage } from "~/types/general"
import { Finding } from "../fields/Finding"
import { FieldAdapter } from "./FieldAdapter"
import { GroupAdapter } from "./GroupAdapter"
import { TextContentAdapter } from "./TextContentAdapter"

interface FindingAdapterProps {
  element: FindingElement
  data: ContextData
  lng: SupportedLanguage
}

export const FindingAdapter = ({ element, data, lng }: FindingAdapterProps) => {
  const wrapper = new ElementWrapper(element)
  const labelEl = wrapper.getFirstChildElement("Label").element
  const label = renderToStaticMarkup(<TextContentAdapter element={labelEl} {...{ data, lng }} />)

  // TODO: Link element

  const children = wrapper.getAllChildElements().map(({ element: child }) => {
    if (child.kind === "Label" || child.kind === "Link") return null

    if (child.kind === "Group") {
      return <GroupAdapter element={child} {...{ data, lng }} />
    }

    return <FieldAdapter element={child} {...{ data, lng }} />
  })

  return <Finding label={label}>{children}</Finding>
}
