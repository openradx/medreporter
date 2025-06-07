import { useLingui } from "@lingui/react/macro"
import { Switch } from "@mantine/core"
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
    <Switch
      label={t`Edit mode`}
      checked={edit === "true"}
      onChange={toggleEditMode}
      size="sm"
      withThumbIndicator={false}
    />
  )
}
