import { TemplateNode } from "~/schemas/template"
import { TemplateAdapter } from "../adapters/TemplateAdapter"

interface EditorPanelProps {
  templateEl: TemplateNode
}

export const DesignerCanvas = ({ templateEl }: EditorPanelProps) => (
  <TemplateAdapter node={templateEl} />
)
