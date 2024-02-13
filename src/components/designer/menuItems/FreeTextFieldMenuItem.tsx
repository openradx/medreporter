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
      width: "auto",
      multiline: false,
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
