import { useMemo } from "react"
import { GroupNode } from "~/schemas/structure"
import { selectMenuTimestamp } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { createNodeId } from "~/utils/designerUtils"
import { DraggableMenuItem } from "./DraggableMenuItem"
import { MenuItem } from "./MenuItem"

interface GroupMenuItemProps {
  label: string
}

export const GroupMenuItem = ({ label }: GroupMenuItemProps) => {
  const timestamp = useAppSelector(selectMenuTimestamp)

  const node: GroupNode = useMemo(
    () => ({
      type: "Group",
      nodeId: createNodeId("group"),
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
