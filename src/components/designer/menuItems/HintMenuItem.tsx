import { useMemo } from "react"
import { HintNode } from "~/schemas/structure"
import { selectMenuTimestamp } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { createNodeId } from "~/utils/designerUtils"
import { DraggableMenuItem } from "./DraggableMenuItem"
import { MenuItem } from "./MenuItem"

interface HintMenuItemProps {
  label: string
}

export const HintMenuItem = ({ label }: HintMenuItemProps) => {
  const timestamp = useAppSelector(selectMenuTimestamp)

  const node: HintNode = useMemo(
    () => ({
      type: "Hint",
      nodeId: createNodeId("hint"),
      level: "info",
      hidden: "",
      content: {
        contentType: "code",
        contentValue: "",
      },
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
