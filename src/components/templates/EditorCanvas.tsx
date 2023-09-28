import { Card } from "@mantine/core"
import { StructureCanvas } from "./StructureCanvas"

export const EditorCanvas = () => (
  <Card shadow="sm" padding="lg" radius="md" withBorder sx={{ height: "100%" }}>
    <StructureCanvas />
  </Card>
)
