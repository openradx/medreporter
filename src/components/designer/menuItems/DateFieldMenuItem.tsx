import { useMemo } from "react"
import { DateFieldNode } from "~/schemas/structure"
import { selectMenuTimestamp } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { createFieldId, createNodeId } from "~/utils/designerUtils"
import { DraggableMenuItem } from "./DraggableMenuItem"
import { MenuItem } from "./MenuItem"

interface DateFieldMenuItemProps {
  label: string
}

export const DateFieldMenuItem = ({ label }: DateFieldMenuItemProps) => {
  const timestamp = useAppSelector(selectMenuTimestamp)

  const node: DateFieldNode = useMemo(
    () => ({
      type: "DateField",
      nodeId: createNodeId("date"),
      fieldId: createFieldId("date"),
      label: "Date",
      info: "",
      disabled: "",
      hidden: "",
      format: "YYYY-MM-DD",
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
