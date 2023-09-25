import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core"
import { Grid, Portal } from "@mantine/core"
import { useState } from "react"
import { useMounted } from "~/hooks/useMounted"
import { EditorCanvas } from "./EditorCanvas"
import { Element } from "./Element"
import { ElementsMenu } from "./ElementsMenu"
import { PropertiesPanel } from "./PropertiesPanel"

export const VisualEditor = () => {
  const mounted = useMounted()
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === "droppable-area") {
      console.log("Dropped on droppable area")
    }
  }

  return (
    mounted && (
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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
        <Portal>
          <DragOverlay dropAnimation={{ sideEffects: null }}>
            {activeId ? <Element label="Number" /> : null}
          </DragOverlay>
        </Portal>
      </DndContext>
    )
  )
}
