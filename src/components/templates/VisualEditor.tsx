import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { Grid } from "@mantine/core"
import { EditorCanvas } from "./EditorCanvas"
import { ElementsMenu } from "./ElementsMenu"
import { PropertiesPanel } from "./PropertiesPanel"

export const VisualEditor = () => {
  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === "droppable-area") {
      console.log("Dropped on droppable area")
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Grid sx={{ height: "100%" }}>
        <Grid.Col span={3}>
          <ElementsMenu />
        </Grid.Col>
        <Grid.Col span={6}>
          <EditorCanvas />
        </Grid.Col>
        <Grid.Col span={3}>
          <PropertiesPanel />
        </Grid.Col>
      </Grid>
    </DndContext>
  )
}
