import { Card } from "@mantine/core"
import { DroppableLayout } from "./DroppableLayout"

export const EditorCanvas = () => (
  <Card shadow="sm" padding="lg" radius="md" withBorder sx={{ height: "100%" }}>
    Drag your components here.
    <DroppableLayout />
  </Card>
)
