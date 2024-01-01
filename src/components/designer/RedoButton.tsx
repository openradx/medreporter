import { ActionIcon } from "@mantine/core"
import { MdRedo as RedoIcon } from "react-icons/md"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { redo, selectCanRedo } from "~/state/templateSlice"

export const RedoButton = () => {
  const { t } = useSiteTranslation()
  const canRedo = useAppSelector(selectCanRedo)
  const dispatch = useAppDispatch()

  return (
    <ActionIcon
      title={t("RedoButton.title")}
      variant="default"
      disabled={!canRedo}
      onClick={() => dispatch(redo())}
      aria-label="Redo"
    >
      <RedoIcon size={20} />
    </ActionIcon>
  )
}
