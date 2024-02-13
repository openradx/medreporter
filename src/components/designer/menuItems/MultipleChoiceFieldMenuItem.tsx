import { useMemo } from "react"
import { MultipleChoiceFieldNode } from "~/schemas/structure"
import { selectMenuTimestamp } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { createFieldId, createNodeId } from "~/utils/designerUtils"
import { createExampleOptions } from "~/utils/fieldUtils"
import { DraggableMenuItem } from "./DraggableMenuItem"
import { MenuItem } from "./MenuItem"

interface MultipleChoiceFieldMenuItemProps {
  label: string
}

export const MultipleChoiceFieldMenuItem = ({ label }: MultipleChoiceFieldMenuItemProps) => {
  const timestamp = useAppSelector(selectMenuTimestamp)

  const node: MultipleChoiceFieldNode = useMemo(
    () => ({
      type: "MultipleChoiceField",
      nodeId: createNodeId("multipleChoice"),
      fieldId: createFieldId("multipleChoice"),
      label: "Multiple choice",
      info: "",
      disabled: "",
      hidden: "",
      width: "auto",
      variant: "checkbox",
      figure: "",
      options: createExampleOptions(3),
      default: [],
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
