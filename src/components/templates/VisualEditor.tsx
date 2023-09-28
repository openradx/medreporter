import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core"
import { Grid, Portal } from "@mantine/core"
import { useState } from "react"
import { useMounted } from "~/hooks/useMounted"
import { addElement } from "~/state/editorSlice"
import { useAppDispatch } from "~/state/store"
import { EditorCanvas } from "./EditorCanvas"
import { ElementsMenu } from "./ElementsMenu"
import { PropertiesPanel } from "./PropertiesPanel"

export const VisualEditor = () => {
  const mounted = useMounted()
  const [dragging, setDragging] = useState(false)
  const dispatch = useAppDispatch()

  const handleDragStart = () => {
    setDragging(true)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setDragging(false)
    const activeId = String(event.active.id)
    const overId = String(event.over?.id)
    if (overId === "droppable-area") {
      if (activeId.toString().startsWith("menu-")) {
        dispatch(addElement({ activeId, overId }))
      }
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
            {dragging ? <div>foobar</div> : null}
          </DragOverlay>
        </Portal>
      </DndContext>
    )
  )
}
