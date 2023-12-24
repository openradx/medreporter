import { TemplateNode } from "~/schemas/template"
import { Template } from "../template/Template"
import { ReportAdapter } from "./ReportAdapter"
import { StructureAdapter } from "./StructureAdapter"

interface TemplateAdapterProps {
  node: TemplateNode
}

export const TemplateAdapter = ({ node }: TemplateAdapterProps) => (
  <Template title={node.title} info={node.info}>
    <StructureAdapter node={node.structure} />
    <ReportAdapter node={node.report} />
  </Template>
)
