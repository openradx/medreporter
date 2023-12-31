import { useDesigner } from "~/contexts/DesignerContext"
import { selectPreview } from "~/state/designerSlice"
import { useAppSelector } from "~/state/store"

export const useIsDesigning = () => {
  const designer = useDesigner()
  const preview = useAppSelector(selectPreview)

  return designer?.isInsideDesigner && !preview
}
