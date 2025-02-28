import { ActionIcon } from "@mantine/core"
import { Pencil as EditIcon, PencilOff as StopEditIcon } from "lucide-react"
import { useRouter } from "next/router"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const ToggleEditModeButton = () => {
  const { t } = useSiteTranslation()
  const router = useRouter()

  const toggleEditMode = () => {
    const currentQuery = { ...router.query }
    if (currentQuery.edit === "true") {
      delete currentQuery.edit
    } else {
      currentQuery.edit = "true"
    }

    router.replace({ pathname: router.pathname, query: currentQuery }, undefined, { shallow: true })
  }

  const { edit } = router.query

  return (
    <ActionIcon
      title={edit ? t("ToggleEditModeButton.titleStop") : t("ToggleEditModeButton.titleEdit")}
      variant="default"
      aria-label="Edit template"
      size="md"
      onClick={toggleEditMode}
    >
      {edit ? <StopEditIcon size={20} /> : <EditIcon size={20} />}
    </ActionIcon>
  )
}
