import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { Portal } from "@mantine/core"
import { ReactNode, useState } from "react"
import { DraggableData, StructuredReportNode, isContainerNode } from "~/utils/designerUtils"
import { DesignerContainerItem } from "./DesignerContainerItem"

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
      item = <DesignerContainerItem node={node} />
    } else {
      item = <div style={{ backgroundColor: "red", width: 50 }}>xxxx</div>
    }
  }

  return (
    <Portal>
      <DragOverlay dropAnimation={null}>{draggedItem && item}</DragOverlay>
    </Portal>
  )
}
