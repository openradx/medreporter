import { useDroppable } from "@dnd-kit/core"
import { ReactNode } from "react"

interface DroppableLayoutProps {
  children: ReactNode
}

export const DroppableLayout = ({ children }: DroppableLayoutProps) => {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable-area" })

  const style = { color: isOver ? "green" : undefined }

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  )
}
