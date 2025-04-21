import { Trans } from "@lingui/react/macro"
import { Button } from "@mantine/core"
import { useState } from "react"
import { AddUserModal } from "./AddUserModal"

export const AddUserButton = () => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Button variant="light" onClick={() => setOpened(true)}>
        <Trans>Add new user</Trans>
      </Button>
      {opened && <AddUserModal opened={opened} onClose={() => setOpened(false)} />}
    </>
  )
}
