import { useMemo } from "react"
import { SingleChoiceFieldNode } from "~/schemas/structure"
import { selectMenuTimestamp } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { createFieldId, createNodeId } from "~/utils/designerUtils"
import { createExampleOptions } from "~/utils/fieldUtils"
import { DraggableMenuItem } from "./DraggableMenuItem"
import { MenuItem } from "./MenuItem"

interface SingleChoiceFieldMenuItemProps {
  label: string
}

export const SingleChoiceFieldMenuItem = ({ label }: SingleChoiceFieldMenuItemProps) => {
  const timestamp = useAppSelector(selectMenuTimestamp)

  const node: SingleChoiceFieldNode = useMemo(
    () => ({
      type: "SingleChoiceField",
      nodeId: createNodeId("singleChoice"),
      fieldId: createFieldId("singleChoice"),
      label: "Single choice",
      info: "",
      disabled: "",
      hidden: "",
      width: "small",
      variant: "radio",
      figure: "",
      options: createExampleOptions(3),
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
