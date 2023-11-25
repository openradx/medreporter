import { Card } from "@mantine/core"
import { useAppSelector } from "~/state/store"
import { selectTemplate } from "~/state/templateSlice"
import { TemplateAdapter } from "../adapters/TemplateAdapter"

export const EditorPanel = () => {
  const template = useAppSelector(selectTemplate)

  return (
    <Card shadow="sm" padding="lg" radius="md" h="100%" withBorder>
      <TemplateAdapter element={template} />
    </Card>
  )
}
