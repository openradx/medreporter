import { useDraggable, useDroppable } from "@dnd-kit/core"
import { Box, Card, Text } from "@mantine/core"
import { ReactNode } from "react"
import { match } from "ts-pattern"
import { useContainer } from "~/contexts/ContainerContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { selectSelectedItem, setSelectedItem } from "~/state/designerSlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { AddableNode, DraggableData, DroppableData, isContainerNode } from "~/utils/designerUtils"
import { DroppableContainer } from "./DroppableContainer"

interface DraggableCanvasItemProps {
  node: AddableNode
  children?: ReactNode
}

export const DraggableCanvasItem = ({ node, children }: DraggableCanvasItemProps) => {
  const { t } = useSiteTranslation()
  const selectedItem = useAppSelector(selectSelectedItem)
  const dispatch = useAppDispatch()
  const { direction } = useContainer()

  const { type } = node

  let fieldId: string | undefined
  if ("fieldId" in node) {
    fieldId = node.fieldId
  }

  const draggable = useDraggable({
    id: node.nodeId,
    data: { origin: "template", node } satisfies DraggableData,
  })

  const droppableStart = useDroppable({
    id: `${node.nodeId}-start`,
    data: { origin: "template", dropType: "start", node } satisfies DroppableData,
  })

  const droppableEnd = useDroppable({
    id: `${node.nodeId}-end`,
    data: { origin: "template", dropType: "end", node } satisfies DroppableData,
  })

  let boxShadow: string | undefined

  if (!draggable.isDragging) {
    boxShadow = match({
      direction,
      overStart: droppableStart.isOver,
      overEnd: droppableEnd.isOver,
    })
      .with({ direction: "row", overStart: true, overEnd: false }, () => "4px 0 blue inset")
      .with({ direction: "row", overStart: false, overEnd: true }, () => "-4px 0 blue inset")
      .with({ direction: "column", overStart: true, overEnd: false }, () => "0 4px blue inset")
      .with({ direction: "column", overStart: false, overEnd: true }, () => "0 -4px blue inset")
      .otherwise(() => undefined)

    if (selectedItem === node.nodeId) {
      boxShadow = "0 0 4px 4px gray"
    }
  }

  // let opacity: number | undefined
  // if (draggable.isDragging) {
  //   opacity = 0.5
  // }

  return (
    <Box
      w={direction === "row" ? 250 : undefined}
      pos="relative"
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onClick={(ev) => {
        ev.stopPropagation()
        dispatch(setSelectedItem(node.nodeId))
      }}
    >
      {direction === "row" && (
        <>
          <Box bg="red" ref={droppableStart.setNodeRef} pos="absolute" w="50%" h="100%" left={0} />
          <Box bg="blue" ref={droppableEnd.setNodeRef} pos="absolute" w="50%" h="100%" right={0} />
        </>
      )}
      {direction === "column" && !isContainerNode(node) && (
        <>
          <Box bg="red" ref={droppableStart.setNodeRef} pos="absolute" w="100%" h="50%" top={0} />
          <Box bg="blue" ref={droppableEnd.setNodeRef} pos="absolute" w="100%" h="50%" bottom={0} />
        </>
      )}
      <Card padding="xs" shadow="sm" style={{ boxShadow, opacity: 0.5 }} withBorder>
        <Card.Section inheritPadding pos="relative">
          {isContainerNode(node) && (
            <Box
              bg="red"
              ref={droppableStart.setNodeRef}
              pos="absolute"
              w="100%"
              h="100%"
              top={0}
              left={0}
              opacity={0.5}
            />
          )}
          <Text>
            {t("EditorItem.type")}: {type}
          </Text>
          <Text size="sm" c="dimmed" truncate>
            {t("EditorItem.id")}: {fieldId ?? "-"}
          </Text>
          <Text size="sm" c="dimmed" truncate>
            Node ID: {node.nodeId}
          </Text>
        </Card.Section>
        {isContainerNode(node) && (
          <>
            <DroppableContainer node={node}>{children}</DroppableContainer>
            <Box
              bg="blue"
              ref={droppableEnd.setNodeRef}
              opacity={0.5}
              pos="absolute"
              w="100%"
              h={10}
              bottom={0}
              left={0}
            />
          </>
        )}
      </Card>
    </Box>
  )
}
