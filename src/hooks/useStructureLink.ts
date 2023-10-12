import { useSection } from "~/contexts/SectionContext"
import { showField } from "~/state/displaySlice"
import { useAppDispatch } from "~/state/store"

export const useStructureLink = ({ fieldId }: { fieldId?: string }) => {
  const dispatch = useAppDispatch()
  const section = useSection()

  const activateLink = () => {
    if (fieldId) {
      dispatch(
        showField({
          sectionId: section?.id,
          fieldId,
        })
      )
    }
  }

  return { activateLink }
}
