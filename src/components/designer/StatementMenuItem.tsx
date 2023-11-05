import { useMemo } from "react"
import { StatementNode } from "~/schemas/report"
import { selectMenuTimestamp } from "~/state/editorSlice"
import { useAppSelector } from "~/state/store"
import { createNodeId } from "~/utils/editorUtils"
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
      timestamp,
      content: "",
      link: "",
    }),
    [timestamp]
  )

  return (
    <DraggableMenuItem node={node}>
      <MenuItem label={label} />
    </DraggableMenuItem>
  )
}
