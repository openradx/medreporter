import { Switch } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { selectPreview, setPreview } from "~/state/designerSlice"
import { useAppDispatch, useAppSelector } from "~/state/store"

export const PreviewSwitch = () => {
  const { t } = useSiteTranslation()
  const preview = useAppSelector(selectPreview)
  const dispatch = useAppDispatch()

  return (
    <Switch
      size="sm"
      label={t("PreviewSwitch.label")}
      checked={preview}
      onChange={(event) => dispatch(setPreview(event.currentTarget.checked))}
    />
  )
}
