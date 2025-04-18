import { useMemo } from "react"
import { FreeTextFieldNode } from "~/schemas/structure"
import { selectMenuTimestamp } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { createFieldId, createNodeId } from "~/utils/designerUtils"
import { DraggableMenuItem } from "./DraggableMenuItem"
import { MenuItem } from "./MenuItem"

interface FreeTextFieldMenuItemProps {
  label: string
}

export const FreeTextFieldMenuItem = ({ label }: FreeTextFieldMenuItemProps) => {
  const timestamp = useAppSelector(selectMenuTimestamp)

  const node: FreeTextFieldNode = useMemo(
    () => ({
      type: "FreeTextField",
      nodeId: createNodeId("freeText"),
      fieldId: createFieldId("freeText"),
      label: "Free text",
      info: "",
      disabled: "",
      hidden: "",
      width: "small",
      multiline: false,
      grow: true,
      rows: 3,
      minRows: 2,
      maxRows: 7,
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
