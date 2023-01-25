import { ParagraphElement } from "@medreporter/medtl-schema"
import { ContextData, ElementWrapper } from "@medreporter/medtl-tools"
import { SupportedLanguage } from "~/types/general"
import { Paragraph } from "../sr/Paragraph"
import { StatementAdapter } from "./StatementAdapter"
import { TextContentAdapter } from "./TextContentAdapter"

interface ParagraphAdapterProps {
  element: ParagraphElement
  data: ContextData
  lng: SupportedLanguage
}

export const ParagraphAdapter = ({ element, data, lng }: ParagraphAdapterProps) => {
  const wrapper = new ElementWrapper(element)
  const ref = wrapper.getAttribute("ref")?.getStringValue()

  return (
    <Paragraph fieldId={ref}>
      {wrapper.getAllChildElements().map(({ element: child }) => (
        <StatementAdapter element={child} {...{ data, lng }} />
      ))}
      <TextContentAdapter {...{ element, data, lng }} />
    </Paragraph>
  )
}
