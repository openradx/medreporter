import { useDroppable } from "@dnd-kit/core"
import { Box } from "@mantine/core"
import { ReactNode } from "react"

interface DroppableContainerProps {
  id: string
  children: ReactNode
}

export const DroppableContainer = ({ id, children }: DroppableContainerProps) => {
  const { isOver, setNodeRef } = useDroppable({ id })

  const style = { backgroundColor: isOver ? "green" : "red" }

  return (
    <Box sx={{ flexGrow: 1 }} ref={setNodeRef} style={style}>
      {children}
    </Box>
  )
}
