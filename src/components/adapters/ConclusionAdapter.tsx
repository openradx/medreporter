import { ConclusionElement } from "@medreporter/medtl-schema"
import { ContextData, createContext, ElementWrapper } from "@medreporter/medtl-tools"
import { SupportedLanguage } from "~/types/general"
import { Conclusion } from "../sr/Conclusion"
import { TextContentAdapter } from "./TextContentAdapter"

interface ConclusionAdapterProps {
  element: ConclusionElement
  data: ContextData
  lng: SupportedLanguage
}

export const ConclusionAdapter = ({ element, data, lng }: ConclusionAdapterProps) => {
  const context = createContext(data, lng)

  const wrapper = new ElementWrapper(element)
  const if_ = wrapper.getAttribute("if")?.getBooleanValue(context)
  if (if_ === false) return null

  const priority = wrapper.getAttribute("priority")?.getStringValue()
  const ref = wrapper.getAttribute("ref")?.getStringValue()

  // TODO: link, each

  return (
    <Conclusion priority={priority} fieldId={ref}>
      <TextContentAdapter {...{ element, data, lng }} />
    </Conclusion>
  )
}
