import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { Portal } from "@mantine/core"
import { ReactNode, useState } from "react"
import { AddableNode, DragData, StructuredReportNode, isContainerNode } from "~/utils/editorUtils"
import { DesignerContainerItem } from "./DesignerContainerItem"
import { DesignerLeafItem } from "./DesignerLeafItem"

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

  const data: DragData | undefined = draggedItem?.data.current as DragData
  const node: StructuredReportNode | undefined = data?.node
  let item: ReactNode = null
  if (node) {
    if (isContainerNode(node)) {
      item = <DesignerContainerItem node={node} />
    } else {
      item = <DesignerLeafItem node={node as AddableNode} />
    }
  }

  return (
    <Portal>
      <DragOverlay dropAnimation={{ sideEffects: null }}>{draggedItem && item}</DragOverlay>
    </Portal>
  )
}
