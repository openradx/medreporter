import { ReactNode, useEffect } from "react"
import { Priority, useConclusionRegistrySetters } from "~/contexts/ConclusionRegistrySettersContext"
import { useStructureLink } from "~/hooks/useStructureLink"
import { StructureLink } from "./StructureLink"

interface ConclusionProps {
  priority?: Priority
  sectionId?: string
  moduleId?: string
  fieldId?: string
  children?: ReactNode
}

export const Conclusion = ({
  priority = "low",
  sectionId,
  moduleId,
  fieldId,
  children,
}: ConclusionProps) => {
  const { activateLink } = useStructureLink({ sectionId, moduleId, fieldId })
  const { addConclusion, removeConclusion } = useConclusionRegistrySetters()

  useEffect(() => {
    const conclusion = <StructureLink onClick={activateLink}>{children}</StructureLink>

    if (children) {
      addConclusion(priority, conclusion)
      return () => {
        removeConclusion(priority, conclusion)
      }
    }
    return undefined
  }, [children, priority, activateLink, addConclusion, removeConclusion])

  return null
}
