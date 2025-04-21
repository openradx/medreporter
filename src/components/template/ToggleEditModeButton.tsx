import { useLingui } from "@lingui/react/macro"
import { ActionIcon } from "@mantine/core"
import { Pencil as EditIcon, PencilOff as StopEditIcon } from "lucide-react"
import { useRouter } from "next/router"

export const ToggleEditModeButton = () => {
  const { t } = useLingui()
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
      title={edit ? t`Stop editing` : t`Edit template`}
      variant="default"
      aria-label="Edit template"
      size="md"
      onClick={toggleEditMode}
    >
      {edit ? <StopEditIcon size={20} /> : <EditIcon size={20} />}
    </ActionIcon>
  )
}
