import { evalCodeToBoolean } from "~/medtl/interpreter"
import { GroupNode } from "~/schemas/structure"
import { selectEditing } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { Group } from "../template/Group"
import { Info } from "../template/Info"
import { DiscreteFieldAdapter } from "./DiscreteFieldAdapter"
import { HintAdapter } from "./HintAdapter"
import { LayoutAdapter } from "./LayoutAdapter"

interface GroupAdapterProps {
  node: GroupNode
}

export const GroupAdapter = ({ node }: GroupAdapterProps) => {
  const editing = useAppSelector(selectEditing)

  const children = node.children.map((child) => {
    switch (child.type) {
      case "Layout":
        return <LayoutAdapter key={child.nodeId} node={child} />
      case "Hint":
        return <HintAdapter key={child.nodeId} node={child} />
      default:
        return <DiscreteFieldAdapter key={child.nodeId} node={child} />
    }
  })

  if (editing) {
    return <DraggableCanvasItem node={node}>{children}</DraggableCanvasItem>
  }

  return (
    <Group
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={evalCodeToBoolean(node.disabled)}
      hidden={evalCodeToBoolean(node.hidden)}
      border={node.border}
      direction={node.direction}
      justify={node.justify}
    >
      {}
    </Group>
  )
}
