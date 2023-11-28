import { useMemo } from "react"
import { LayoutNode } from "~/schemas/structure"
import { selectMenuTimestamp } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { createNodeId } from "~/utils/designerUtils"
import { DraggableMenuItem } from "./DraggableMenuItem"
import { MenuItem } from "./MenuItem"

interface LayoutMenuItemProps {
  label: string
}

export const LayoutMenuItem = ({ label }: LayoutMenuItemProps) => {
  const timestamp = useAppSelector(selectMenuTimestamp)

  const node: LayoutNode = useMemo(
    () => ({
      type: "Layout",
      nodeId: createNodeId("layout"),
      timestamp,
      children: [],
    }),
    [timestamp]
  )

  return (
    <DraggableMenuItem node={node}>
      <MenuItem label={label} />
    </DraggableMenuItem>
  )
}
