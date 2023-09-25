import { useDraggable } from "@dnd-kit/core"
import { Element } from "./Element"

interface DraggableElementProps {
  id: string
  label: string
}

export const DraggableElement = ({ id, label }: DraggableElementProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id })

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      <Element label={label} />
    </div>
  )
}
