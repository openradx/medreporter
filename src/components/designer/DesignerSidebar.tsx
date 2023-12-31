import { Active, useDndMonitor } from "@dnd-kit/core"
import { Box, Card } from "@mantine/core"
import { useState } from "react"
import { selectSelectedItem } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { DesignerMenu } from "./DesignerMenu"
import { PropertiesPanel } from "./PropertiesPanel"
import { TrashCan } from "./TrashCan"

export const DesignerSidebar = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)
  const selectedItem = useAppSelector(selectSelectedItem)

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

  return (
    <Card shadow="sm" padding="xs" radius="md" h="100%" withBorder>
      <Box h="100%" display={draggedItem || selectedItem ? "none" : "block"}>
        <DesignerMenu />
      </Box>
      <Box h="100%" display={draggedItem ? "block" : "none"}>
        <TrashCan />
      </Box>
      <Box h="100%" display={selectedItem ? "block" : "none"}>
        <PropertiesPanel />
      </Box>
    </Card>
  )
}
