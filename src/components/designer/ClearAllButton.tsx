import { ActionIcon } from "@mantine/core"
import { AiOutlineClear as ClearAllIcon } from "react-icons/ai"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { useAppDispatch } from "~/state/store"
import { resetTemplate } from "~/state/templateSlice"

export const ClearAllButton = () => {
  const { t } = useSiteTranslation()
  const dispatch = useAppDispatch()

  return (
    <ActionIcon
      title={t("ClearAllButton.title")}
      variant="default"
      // disabled={!modified}
      onClick={() => dispatch(resetTemplate({}))}
      aria-label="Clear form"
    >
      <ClearAllIcon size={20} />
    </ActionIcon>
  )
}
