import { ReportElement } from "@medreporter/medtl-schema"
import { ContextData, ElementWrapper } from "@medreporter/medtl-tools"
import { Report } from "~/components/sr/Report"
import { SupportedLanguage } from "~/types/general"
import { ConclusionAdapter } from "./ConclusionAdapter"
import { ParagraphAdapter } from "./ParagraphAdapter"
import { StatementAdapter } from "./StatementAdapter"
import { TextContentAdapter } from "./TextContentAdapter"

interface ReportAdapterProps {
  element?: ReportElement
  data: ContextData
  lng: SupportedLanguage
}

export const ReportAdapter = ({ element, data, lng }: ReportAdapterProps) => {
  const wrapper = element && new ElementWrapper(element)
  const children = wrapper?.getAllChildElements().map(({ element: child }, index) => {
    switch (child.kind) {
      case "Paragraph": {
        return <ParagraphAdapter key={index} element={child} {...{ data, lng }} />
      }
      case "Statement": {
        return <StatementAdapter key={index} element={child} {...{ data, lng }} />
      }
      case "Conclusion": {
        return <ConclusionAdapter key={index} element={child} {...{ data, lng }} />
      }
      case "Text": {
        return <TextContentAdapter key={index} element={child} {...{ data, lng }} />
      }
      default: {
        throw new Error("Invalid element type.")
      }
    }
  })
  return <Report>{children}</Report>
}
