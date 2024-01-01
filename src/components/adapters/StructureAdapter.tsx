import { ReactNode } from "react"
import { useDesigner } from "~/contexts/DesignerContext"
import { StructureNode } from "~/schemas/structure"
import { selectActiveSectionId } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"
import { ActionsGroup } from "../common/ActionsGroup"
import { ClearAllButton } from "../designer/ClearAllButton"
import { PreviewSwitch } from "../designer/PreviewSwitch"
import { RedoButton } from "../designer/RedoButton"
import { UndoButton } from "../designer/UndoButton"
import { Structure } from "../template/Structure"
import { SectionAdapter } from "./SectionAdapter"

interface StructureAdapterProps {
  node: StructureNode
}

export const StructureAdapter = ({ node }: StructureAdapterProps) => {
  const designer = useDesigner()
  const activeSectionId = useAppSelector(selectActiveSectionId)

  let actions: ReactNode | undefined
  if (designer?.isInsideDesigner) {
    actions = (
      <ActionsGroup grow>
        <ClearAllButton />
        <UndoButton />
        <RedoButton />
      </ActionsGroup>
    )
  }

  return (
    <Structure actions={actions}>
      {node.children.map((child, index) => (
        <SectionAdapter
          key={child.nodeId}
          node={child}
          active={activeSectionId === null ? index === 0 : activeSectionId === child.nodeId}
        />
      ))}
    </Structure>
  )
}
