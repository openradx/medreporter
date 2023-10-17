import { useDraggable } from "@dnd-kit/core"
import { ReactNode } from "react"

interface DraggableElementProps {
  id: string
  children: ReactNode
}

export const DraggableElement = ({ id, children }: DraggableElementProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id })

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      {children}
    </div>
  )
}
