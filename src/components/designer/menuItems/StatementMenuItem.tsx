import { useMemo } from "react"
import { StatementNode } from "~/schemas/report"
import { selectMenuTimestamp } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { createNodeId } from "~/utils/designerUtils"
import { DraggableMenuItem } from "./DraggableMenuItem"
import { MenuItem } from "./MenuItem"

interface StatementMenuItemProps {
  label: string
}

export const StatementMenuItem = ({ label }: StatementMenuItemProps) => {
  const timestamp = useAppSelector(selectMenuTimestamp)

  const node: StatementNode = useMemo(
    () => ({
      type: "Statement",
      nodeId: createNodeId("statement"),
      hidden: "",
      content: "",
      link: "",
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
