import { Trans } from "@lingui/react/macro"
import { Button } from "@mantine/core"
import { useState } from "react"
import { AddInstituteModal } from "./AddInstituteModal"

export const AddInstituteButton = () => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Button variant="light" onClick={() => setOpened(true)}>
        <Trans>Add new institute</Trans>
      </Button>
      {opened && <AddInstituteModal opened={opened} onClose={() => setOpened(false)} />}
    </>
  )
}
