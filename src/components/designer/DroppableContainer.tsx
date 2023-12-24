import { useDroppable } from "@dnd-kit/core"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { Box, Flex } from "@mantine/core"
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
  children: ReactNode
}

export const DroppableContainer = ({ node, children }: DroppableContainerProps) => {
  const { isOver, active, setNodeRef } = useDroppable({
    id: `${node.nodeId}-container`,
    data: { origin: "template", dropType: "container", node } satisfies DroppableData,
  })

  let boxShadow: string | undefined
  if (isOver && active) {
    const { node: activeNode } = active.data.current as DraggableData
    if (isFittingContainer(activeNode, node)) {
      boxShadow = "0 0 4px 4px gray inset"
    }
  }

  let direction: "row" | "column" = "column"
  if ("direction" in node && node.direction) {
    direction = node.direction
  }

  let justify: "start" | "center" | "end" | "space-between" | "space-around" = "start"
  if ("justify" in node && node.justify) {
    justify = node.justify
  }

  const [animationParent] = useAutoAnimate()

  return (
    <ContainerContextProvider value={{ direction, justify }}>
      <Box bg="green" p="xs" mih="100%" style={{ boxShadow }} ref={setNodeRef}>
        <Flex direction={direction} justify={justify} wrap="wrap" gap="xs" ref={animationParent}>
          {children}
        </Flex>
      </Box>
    </ContainerContextProvider>
  )
}
