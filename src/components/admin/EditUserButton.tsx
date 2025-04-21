import { useLingui } from "@lingui/react/macro"
import { ActionIcon } from "@mantine/core"
import { User } from "@prisma/client"
import { Pencil as EditIcon } from "lucide-react"
import { useState } from "react"
import { EditUserModal } from "./EditUserModal"

interface EditUserButtonProps {
  user: User
}

export const EditUserButton = ({ user }: EditUserButtonProps) => {
  const { t } = useLingui()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <ActionIcon
        title={t`Edit user`}
        variant="subtle"
        color="gray"
        onClick={() => setOpened(true)}
      >
        <EditIcon size={18} />
      </ActionIcon>
      {opened && <EditUserModal opened={opened} onClose={() => setOpened(false)} user={user} />}
    </>
  )
}
