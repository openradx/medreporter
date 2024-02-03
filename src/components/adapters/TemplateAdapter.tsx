import { TemplateNode } from "~/schemas/template"
import { Template } from "../template/Template"
import { InterpreterProvider } from "./InterpreterProvider"
import { ReportAdapter } from "./ReportAdapter"
import { StructureAdapter } from "./StructureAdapter"

interface TemplateAdapterProps {
  node: TemplateNode
}

export const TemplateAdapter = ({ node }: TemplateAdapterProps) => (
  <InterpreterProvider>
    <Template title={node.title} description={node.description}>
      <StructureAdapter node={node.structure} />
      <ReportAdapter node={node.report} />
    </Template>
  </InterpreterProvider>
)
