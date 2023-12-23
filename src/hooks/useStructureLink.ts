import { useSection } from "~/contexts/SectionContext"
import { showField } from "~/state/displaySlice"
import { useAppDispatch } from "~/state/store"

export const useStructureLink = ({ link }: { link?: string }) => {
  const dispatch = useAppDispatch()
  const section = useSection()

  const activateLink = () => {
    if (link) {
      dispatch(
        showField({
          sectionId: section?.id,
          fieldId: link,
        })
      )
    }
  }

  return { activateLink }
}
