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
import classes from "./DroppableItemContainer.module.css"

interface DroppableItemContainerProps {
  node: ContainerNode
  children: ReactNode
}

export const DroppableItemContainer = ({ node, children }: DroppableItemContainerProps) => {
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

  const [animationParent] = useAutoAnimate()

  return (
    <ContainerContextProvider value={{ direction }}>
      <Box
        className={classes.droppableItemContainer}
        p="xs"
        mih={100}
        style={{ boxShadow, cursor: "default" }}
        ref={setNodeRef}
        // Don't allow the container element to start a dragging
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Flex
          direction={direction}
          justify="start"
          wrap={direction === "column" ? "nowrap" : "wrap"}
          gap="xs"
          ref={animationParent}
        >
          {children}
        </Flex>
      </Box>
    </ContainerContextProvider>
  )
}
