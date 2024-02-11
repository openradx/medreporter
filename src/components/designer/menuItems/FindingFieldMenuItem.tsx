import { useMemo } from "react"
import { FindingFieldNode } from "~/schemas/structure"
import { selectMenuTimestamp } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { createFieldId, createNodeId } from "~/utils/designerUtils"
import { DraggableMenuItem } from "./DraggableMenuItem"
import { MenuItem } from "./MenuItem"

interface FindingFieldMenuItemProps {
  label: string
}

export const FindingFieldMenuItem = ({ label }: FindingFieldMenuItemProps) => {
  const timestamp = useAppSelector(selectMenuTimestamp)

  const node: FindingFieldNode = useMemo(
    () => ({
      type: "FindingField",
      nodeId: createNodeId("finding"),
      fieldId: createFieldId("finding"),
      label: "Finding",
      info: "",
      disabled: "",
      hidden: "",
      direction: "row",
      default: false,
      children: [],
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
