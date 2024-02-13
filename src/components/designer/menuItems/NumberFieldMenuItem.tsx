import { useMemo } from "react"
import { NumberFieldNode } from "~/schemas/structure"
import { selectMenuTimestamp } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { createFieldId, createNodeId } from "~/utils/designerUtils"
import { DraggableMenuItem } from "./DraggableMenuItem"
import { MenuItem } from "./MenuItem"

interface NumberFieldMenuItemProps {
  label: string
}

export const NumberFieldMenuItem = ({ label }: NumberFieldMenuItemProps) => {
  const timestamp = useAppSelector(selectMenuTimestamp)

  const node: NumberFieldNode = useMemo(
    () => ({
      type: "NumberField",
      nodeId: createNodeId("number"),
      fieldId: createFieldId("number"),
      label: "Number",
      info: "",
      disabled: "",
      hidden: "",
      width: "auto",
      min: null,
      max: null,
      precision: 0,
      start: 0,
      step: 1,
      default: null,
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
