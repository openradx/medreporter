import { useAppSelector } from "~/state/store"
import { selectTemplate } from "~/state/templateSlice"
import { TemplateAdapter } from "../adapters/TemplateAdapter"

export const NewTemplate = () => {
  const template = useAppSelector(selectTemplate)

  return <TemplateAdapter node={template} />
}
