import { useDroppable } from "@dnd-kit/core"
import { Box } from "@mantine/core"
import { ReactNode } from "react"
import { ContainerContextProvider } from "~/contexts/ContainerContext"
import {
  ContainerNode,
  DraggableData,
  DroppableData,
  isFittingContainer,
} from "~/utils/designerUtils"

interface DroppableContainerProps {
  node: ContainerNode
  direction: "row" | "column"
  children: ReactNode
}

export const DroppableContainer = ({ node, direction, children }: DroppableContainerProps) => {
  const { isOver, active, setNodeRef } = useDroppable({
    id: node.nodeId,
    data: { origin: "template", dropType: "container", node } satisfies DroppableData,
  })

  let boxShadow: string | undefined
  if (isOver && active) {
    const { node: activeNode } = active.data.current as DraggableData
    if (isFittingContainer(activeNode, node)) {
      boxShadow = "0 0 4px 4px gray inset"
    }
  }

  return (
    <ContainerContextProvider value={{ direction }}>
      <Box style={{ flexGrow: 1, boxShadow }} ref={setNodeRef}>
        {children}
      </Box>
    </ContainerContextProvider>
  )
}
