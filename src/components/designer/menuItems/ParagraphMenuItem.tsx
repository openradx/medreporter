import { useMemo } from "react"
import { ParagraphNode } from "~/schemas/report"
import { selectMenuTimestamp } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { createNodeId } from "~/utils/designerUtils"
import { DraggableMenuItem } from "./DraggableMenuItem"
import { MenuItem } from "./MenuItem"

interface ParagraphMenuItemProps {
  label: string
}

export const ParagraphMenuItem = ({ label }: ParagraphMenuItemProps) => {
  const timestamp = useAppSelector(selectMenuTimestamp)

  const node: ParagraphNode = useMemo(
    () => ({
      type: "Paragraph",
      nodeId: createNodeId("paragraph"),
      link: "",
      title: "",
      hidden: "",
      list: false,
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
