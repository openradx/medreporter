import { useDraggable, useDroppable } from "@dnd-kit/core"
import { Box, Card, Stack, Text } from "@mantine/core"
import { useMemo } from "react"
import { match } from "ts-pattern"
import { useContainer } from "~/contexts/ContainerContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { selectSelectedItem, setSelectedItem } from "~/state/designerSlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { selectTemplate } from "~/state/templateSlice"
import {
  AddableNode,
  DraggableData,
  DroppableData,
  findContainer,
  isFittingContainer,
} from "~/utils/designerUtils"

interface DraggableCanvasItemProps {
  node: AddableNode
}

export const DraggableCanvasItem = ({ node }: DraggableCanvasItemProps) => {
  const { t } = useSiteTranslation()
  const selectedItem = useAppSelector(selectSelectedItem)
  const template = useAppSelector(selectTemplate)
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

  const container = useMemo(() => findContainer(template, node.nodeId), [template, node])
  const dataStart = droppableStart.active?.data.current as DroppableData | undefined
  const dataEnd = droppableEnd.active?.data.current as DroppableData | undefined
  const activeNode = dataStart?.node || dataEnd?.node
  const isFitting = !!activeNode && !!container && isFittingContainer(activeNode, container)

  let boxShadow: string | undefined

  if (!draggable.isDragging) {
    if (isFitting) {
      boxShadow = match({
        direction,
        overStart: droppableStart.isOver,
        overEnd: droppableEnd.isOver,
      })
        .with({ direction: "row", overStart: true, overEnd: false }, () => "4px 0 gray inset")
        .with({ direction: "row", overStart: false, overEnd: true }, () => "-4px 0 gray inset")
        .with({ direction: "column", overStart: true, overEnd: false }, () => "0 4px gray inset")
        .with({ direction: "column", overStart: false, overEnd: true }, () => "0 -4px gray inset")
        .otherwise(() => undefined)
    }

    if (selectedItem === node.nodeId) {
      boxShadow = "0 0 4px 4px gray"
    }
  }

  let opacity: number | undefined
  if (draggable.isDragging) {
    opacity = 0.5
  }

  return (
    <Box
      w={direction === "row" ? 250 : 300}
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
          <Box ref={droppableStart.setNodeRef} pos="absolute" w="50%" h="100%" left={0} />
          <Box ref={droppableEnd.setNodeRef} pos="absolute" w="50%" h="100%" right={0} />
        </>
      )}
      {direction === "column" && (
        <>
          <Box ref={droppableStart.setNodeRef} pos="absolute" w="100%" h="50%" top={0} />
          <Box ref={droppableEnd.setNodeRef} pos="absolute" w="100%" h="50%" bottom={0} />
        </>
      )}
      <Card padding="xs" shadow="sm" style={{ boxShadow, opacity }} withBorder>
        <Card.Section inheritPadding pos="relative">
          <Stack gap={0}>
            <Text>
              {t("EditorItem.type")}: {type}
            </Text>
            <Text size="sm" c="dimmed" truncate>
              {t("EditorItem.id")}: {fieldId ?? "-"}
            </Text>
            <Text size="sm" c="dimmed" truncate>
              Node ID: {node.nodeId}
            </Text>
          </Stack>
        </Card.Section>
      </Card>
    </Box>
  )
}
