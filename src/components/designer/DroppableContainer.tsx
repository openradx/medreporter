import { useDroppable } from "@dnd-kit/core"
import { Box } from "@mantine/core"
import { CSSProperties, ReactNode } from "react"
import { ContainerNode, DragData, isFittingContainer } from "~/utils/editorUtils"

interface DroppableContainerProps {
  node: ContainerNode
  children: ReactNode
}

export const DroppableContainer = ({ node, children }: DroppableContainerProps) => {
  const { isOver, active, setNodeRef } = useDroppable({
    id: node.nodeId,
    data: { origin: "template", node } satisfies DragData,
  })

  let style: CSSProperties = {}
  if (isOver && active) {
    const { node: activeNode } = active.data.current as DragData
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
