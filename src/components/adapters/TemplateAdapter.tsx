import { TemplateEl } from "~/schemas/template"
import { Template } from "../template/Template"
import { ReportAdapter } from "./ReportAdapter"
import { StructureAdapter } from "./StructureAdapter"

interface TemplateAdapterProps {
  element: TemplateEl
}

export const TemplateAdapter = ({ element }: TemplateAdapterProps) => (
  <Template title={element.title} info={element.info}>
    <StructureAdapter element={element.structure} />
    <ReportAdapter element={element.report} />
  </Template>
)
