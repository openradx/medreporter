import { useDroppable } from "@dnd-kit/core"
import { Box } from "@mantine/core"
import { CSSProperties, ReactNode } from "react"
import { AddableNode, DraggableData, isFittingContainer } from "~/utils/designerUtils"

interface DroppableItemProps {
  node: AddableNode
  children: ReactNode
}

export const DroppableItem = ({ node, children }: DroppableItemProps) => {
  const { isOver, active, setNodeRef } = useDroppable({
    id: node.nodeId,
    data: { origin: "template", node } satisfies DraggableData,
  })

  let style: CSSProperties = {}
  if (isOver && active) {
    const { node: activeNode } = active.data.current as DraggableData
    console.log("node", node)
    console.log("activeNode", node)
    if (isFittingContainer(activeNode, node)) {
      style = { backgroundColor: "red" }
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }} ref={setNodeRef} style={style}>
      {children}
    </Box>
  )
}
