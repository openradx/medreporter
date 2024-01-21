import { useMemo } from "react"
import { TimeFieldNode } from "~/schemas/structure"
import { selectMenuTimestamp } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { createFieldId, createNodeId } from "~/utils/designerUtils"
import { DraggableMenuItem } from "./DraggableMenuItem"
import { MenuItem } from "./MenuItem"

interface TimeFieldMenuItemProps {
  label: string
}

export const TimeFieldMenuItem = ({ label }: TimeFieldMenuItemProps) => {
  const timestamp = useAppSelector(selectMenuTimestamp)

  const node: TimeFieldNode = useMemo(
    () => ({
      type: "TimeField",
      nodeId: createNodeId("time"),
      fieldId: createFieldId("time"),
      label: "Time",
      info: "",
      disabled: "",
      hidden: "",
      withSeconds: false,
      default: "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timestamp]
  )

  return (
    <DraggableMenuItem node={node}>
      <MenuItem label={label} />
    </DraggableMenuItem>
  )
}
