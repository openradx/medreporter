import { DesignerContextProvider } from "~/contexts/DesignerContext"
import { TemplateNode } from "~/schemas/template"
import { TemplateAdapter } from "../adapters/TemplateAdapter"

interface EditorPanelProps {
  templateEl: TemplateNode
}

export const DesignerPanel = ({ templateEl }: EditorPanelProps) => (
  <DesignerContextProvider value={{ designMode: true }}>
    <TemplateAdapter node={templateEl} />
  </DesignerContextProvider>
)
