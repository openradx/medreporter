import { Button } from "@mantine/core"
import { useState } from "react"
import { useSiteTranslation } from "../../core/hooks/useSiteTranslation"
import { AddUserModal } from "./AddUserModal"

export const AddUserButton = () => {
  const { t } = useSiteTranslation()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Button onClick={() => setOpened(true)}>{t("AddUserButton.label")}</Button>
      {opened && <AddUserModal opened={opened} onClose={() => setOpened(false)} />}
    </>
  )
}
