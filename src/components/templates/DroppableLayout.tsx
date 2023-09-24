import { useDroppable } from "@dnd-kit/core"
import { Box } from "@mantine/core"

export const DroppableLayout = () => {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable-area" })

  const style = { color: isOver ? "green" : undefined }

  return (
    <Box ref={setNodeRef} style={style}>
      Droppable
    </Box>
  )
}
