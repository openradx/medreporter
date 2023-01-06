import { Button } from "@mantine/core"
import { useState } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { AddInstituteModal } from "./AddInstituteModal"

export const AddInstituteButton = () => {
  const { t } = useSiteTranslation()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Button onClick={() => setOpened(true)}>{t("AddInstituteButton.buttonAddInstitute")}</Button>
      {opened && <AddInstituteModal opened={opened} onClose={() => setOpened(false)} />}
    </>
  )
}
