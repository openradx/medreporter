import { useDraggable, useDroppable } from "@dnd-kit/core"
import { Box, Card, Text } from "@mantine/core"
import { useMemo } from "react"
import { match } from "ts-pattern"
import { useContainer } from "~/contexts/ContainerContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { selectSelectedItem, setSelectedItem } from "~/state/designerSlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { AddableNode, DraggableData, DroppableData, isContainerNode } from "~/utils/designerUtils"

interface DesignerItemProps {
  node: AddableNode
}

export const DesignerItem = ({ node }: DesignerItemProps) => {
  const { t } = useSiteTranslation()
  const selectedItem = useAppSelector(selectSelectedItem)
  const dispatch = useAppDispatch()
  const { direction } = useContainer()
  const isContainer = useMemo(() => isContainerNode(node), [node])

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

  const droppableContainer = useDroppable({
    id: `${node.nodeId}-container`,
    data: { origin: "template", dropType: "container", node } satisfies DroppableData,
  })

  let boxShadow = match({
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

  // let boxShadow: string = "none"
  // if (direction === "row") {
  //   if (droppableStart.isOver) {
  //     boxShadow = "-4px 0 2px -2px blue"
  //   } else if (droppableEnd.isOver) {
  //     boxShadow = "4px 0 2px -2px blue"
  //   }
  // } else {
  //   if (droppableStart.isOver) {
  //     boxShadow = "0 -4px 2px -2px blue"
  //   } else if (droppableEnd.isOver) {
  //     boxShadow = "0 4px 2px -2px blue"
  //   }
  // }

  return (
    <Box
      pos="relative"
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onClick={() => dispatch(setSelectedItem(node.nodeId))}
    >
      {direction === "row" && (
        <>
          <Box ref={droppableStart.setNodeRef} pos="absolute" w="100%" h="50%" top={0} />
          <Box ref={droppableEnd.setNodeRef} pos="absolute" w="100%" h="50%" bottom={0} />
        </>
      )}
      {direction === "column" && (
        <>
          <Box ref={droppableStart.setNodeRef} pos="absolute" w="100%" h="50%" top={0} />
          <Box ref={droppableEnd.setNodeRef} pos="absolute" w="100%" h="50%" bottom={0} />
        </>
      )}
      <Card padding="xs" shadow="sm" w={250} style={{ boxShadow }} withBorder>
        <Text>
          {t("EditorItem.type")}: {type}
        </Text>
        <Text size="sm" color="dimmed">
          {t("EditorItem.id")}: {fieldId ?? "-"}
        </Text>
        {isContainer && <Box ref={droppableContainer.setNodeRef} h={200} bg="blue" />}
      </Card>
    </Box>
  )
}
