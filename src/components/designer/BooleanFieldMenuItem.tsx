import { useMemo } from "react"
import { BooleanFieldNode } from "~/schemas/structure"
import { selectMenuTimestamp } from "~/state/editorSlice"
import { useAppSelector } from "~/state/store"
import { createFieldId, createNodeId } from "~/utils/editorUtils"
import { DraggableMenuItem } from "./DraggableMenuItem"
import { MenuItem } from "./MenuItem"

interface BooleanFieldMenuItemProps {
  label: string
}

export const BooleanFieldMenuItem = ({ label }: BooleanFieldMenuItemProps) => {
  const timestamp = useAppSelector(selectMenuTimestamp)

  const node: BooleanFieldNode = useMemo(
    () => ({
      type: "BooleanField",
      nodeId: createNodeId("boolean"),
      fieldId: createFieldId("boolean"),
      label: "Boolean",
      timestamp,
    }),
    [timestamp]
  )

  return (
    <DraggableMenuItem node={node}>
      <MenuItem label={label} />
    </DraggableMenuItem>
  )
}
