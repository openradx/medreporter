import { useDraggable } from "@dnd-kit/core"

interface DraggableElementProps {
  label: string
}

export const DraggableElement = ({ label }: DraggableElementProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable-element",
  })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {label}
    </div>
  )
}
