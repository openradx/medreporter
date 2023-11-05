import { useDraggable } from "@dnd-kit/core"
import { ReactNode } from "react"
import { AddableNode, DragData } from "~/utils/editorUtils"

interface DraggableMenuItemProps {
  node: AddableNode
  children: ReactNode
}

export const DraggableMenuItem = ({ node, children }: DraggableMenuItemProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: node.nodeId,
    data: { origin: "menu", node } satisfies DragData,
  })

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      {children}
    </div>
  )
}
