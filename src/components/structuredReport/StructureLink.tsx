import { Box } from "@mantine/core"
import { ReactNode } from "react"
import { useModule } from "../../contexts/ModuleContext"
import { useSection } from "../../contexts/SectionContext"
import { useAppDispatch } from "../../state/store"
import { activateSection } from "../../state/structureSlice"

interface StructureLinkProps {
  sectionId?: string
  moduleId?: string
  fieldId?: string
  children: ReactNode
}

export const StructureLink = ({ sectionId, moduleId, fieldId, children }: StructureLinkProps) => {
  const dispatch = useAppDispatch()
  const section = useSection()
  const module = useModule()

  const handleClick = () => {
    dispatch(
      activateSection({
        sectionId: sectionId ?? section.id,
        scrollInto: { moduleId: moduleId ?? module.id, fieldId },
      })
    )
  }

  return (
    <Box
      component="span"
      onClick={handleClick}
      sx={{ cursor: "pointer", "&:hover": { backgroundColor: "green" } }}
    >
      {children}
    </Box>
  )
}
