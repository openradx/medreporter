import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ReactNode } from "react"
import { AddableNode, DragData } from "~/utils/editorUtils"

interface SortableItemProps {
  node: AddableNode
  children: ReactNode
}

export const SortableItem = ({ node, children }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: node.nodeId,
    data: { origin: "template", node } satisfies DragData,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}
