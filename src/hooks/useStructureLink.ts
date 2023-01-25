import { useModule } from "~/contexts/ModuleContext"
import { useSection } from "~/contexts/SectionContext"
import { activateSection } from "~/state/displaySlice"
import { useAppDispatch } from "~/state/store"

export const useStructureLink = ({
  sectionId,
  moduleId,
  fieldId,
}: {
  sectionId?: string
  moduleId?: string
  fieldId?: string
}) => {
  const dispatch = useAppDispatch()
  const section = useSection()
  const module_ = useModule()

  const activateLink = () => {
    dispatch(
      activateSection({
        sectionId: sectionId ?? section.id,
        scrollInto: { moduleId: moduleId ?? module_.id, fieldId },
      })
    )
  }

  return { activateLink }
}
