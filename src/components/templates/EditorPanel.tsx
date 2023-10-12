import { Card } from "@mantine/core"
import { useAppSelector } from "~/state/store"
import { selectTemplate } from "~/state/templateSlice"
import { TemplateAdapter } from "../adapters/TemplateAdapter"

export const EditorPanel = () => {
  const template = useAppSelector(selectTemplate)

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder sx={{ height: "100%" }}>
      <TemplateAdapter element={template} />
    </Card>
  )
}
