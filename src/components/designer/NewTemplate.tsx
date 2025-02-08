import { useAppSelector } from "~/state/store"
import { selectTemplate } from "~/state/templateSlice"
import { DesignerNavbarCenter } from "./DesignerNavbarCenter"
import { TemplateDesigner } from "./TemplateDesigner"

export const NewTemplate = () => {
  const template = useAppSelector(selectTemplate)

  return (
    <>
      <DesignerNavbarCenter title={template.title} />
      <TemplateDesigner />
    </>
  )
}
