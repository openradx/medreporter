import { Active, useDndMonitor } from "@dnd-kit/core"
import { Box, Paper } from "@mantine/core"
import { useState } from "react"
import { selectSelectedItem } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { MenuPanel } from "./MenuPanel"
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
    <Paper shadow="sm" h="100%" withBorder>
      <Box h="100%" display={draggedItem || selectedItem ? "none" : "block"}>
        <MenuPanel />
      </Box>
      <Box h="100%" display={draggedItem ? "block" : "none"}>
        <TrashCan />
      </Box>
      <Box h="100%" display={selectedItem ? "block" : "none"}>
        <PropertiesPanel />
      </Box>
    </Paper>
  )
}
