import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { Portal } from "@mantine/core"
import { ReactNode, useState } from "react"
import { DraggableData, StructuredReportNode, isContainerNode } from "~/utils/designerUtils"
import { ContainerDragOverlay } from "./ContainerDragOverlay"
import { ItemDragOverlay } from "./ItemDragOverlay"

export const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active)
    },
    onDragCancel: () => {
      setDraggedItem(null)
    },
    onDragEnd: () => {
      setDraggedItem(null)
    },
  })

  const data: DraggableData | undefined = draggedItem?.data.current as DraggableData
  const node: StructuredReportNode | undefined = data?.node
  let item: ReactNode = null
  if (node) {
    if (isContainerNode(node)) {
      item = <ContainerDragOverlay node={node} />
    } else {
      item = <ItemDragOverlay node={node} />
    }
  }

  return (
    <Portal>
      <DragOverlay dropAnimation={null}>{draggedItem && item}</DragOverlay>
    </Portal>
  )
}
