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
import classes from "./DroppableCanvasContainer.module.css"

interface DroppableCanvasContainerProps {
  node: ContainerNode
  children: ReactNode
}

export const DroppableCanvasContainer = ({ node, children }: DroppableCanvasContainerProps) => {
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

  const direction = "column"
  const justify = "start"

  const [animationParent] = useAutoAnimate()

  return (
    <ContainerContextProvider value={{ direction }}>
      <Box
        className={classes.droppableCanvasContainer}
        p="xs"
        mih="100%"
        style={{ boxShadow }}
        ref={setNodeRef}
      >
        <Flex direction={direction} justify={justify} wrap="nowrap" gap="xs" ref={animationParent}>
          {children}
        </Flex>
      </Box>
    </ContainerContextProvider>
  )
}
