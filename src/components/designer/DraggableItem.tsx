import { useDraggable } from "@dnd-kit/core"
import { ReactNode } from "react"
import { AddableNode, DraggableData } from "~/utils/designerUtils"

interface DraggableItemProps {
  node: AddableNode
  children: ReactNode
}

export const DraggableItem = ({ node, children }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: node.nodeId,
    data: { origin: "template", node } satisfies DraggableData,
  })

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      {children}
    </div>
  )
}
