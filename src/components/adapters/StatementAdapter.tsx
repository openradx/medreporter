import { StatementElement } from "@medreporter/medtl-schema"
import { ContextData, ElementWrapper } from "@medreporter/medtl-tools"
import { SupportedLanguage } from "~/types/general"
import { Statement } from "../sr/Statement"
import { TextContentAdapter } from "./TextContentAdapter"

interface StatementAdapterProps {
  element: StatementElement
  data: ContextData
  lng: SupportedLanguage
}

export const StatementAdapter = ({ element, data, lng }: StatementAdapterProps) => {
  const wrapper = new ElementWrapper(element)
  const ref = wrapper.getAttribute("ref")?.getStringValue()

  return (
    <Statement fieldId={ref}>
      <TextContentAdapter {...{ element, data, lng }} />
    </Statement>
  )
}
