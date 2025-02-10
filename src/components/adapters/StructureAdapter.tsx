import { ReactNode } from "react"
import { useIsDesigning } from "~/hooks/useIsDesigning"
import { StructureNode } from "~/schemas/structure"
import { selectActiveSectionId } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"
import { ActionsGroup } from "../common/ActionsGroup"
import { ClearAllButton } from "../designer/ClearAllButton"
import { RedoButton } from "../designer/RedoButton"
import { UndoButton } from "../designer/UndoButton"
import { Structure } from "../template/Structure"
import { SectionAdapter } from "./SectionAdapter"

interface StructureAdapterProps {
  node: StructureNode
}

export const StructureAdapter = ({ node }: StructureAdapterProps) => {
  const isDesigning = useIsDesigning()
  const activeSectionId = useAppSelector(selectActiveSectionId)

  let actions: ReactNode | undefined
  if (isDesigning) {
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
