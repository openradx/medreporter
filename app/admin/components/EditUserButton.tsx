import { ActionIcon } from "@mantine/core"
import { useState } from "react"
import { MdEdit as EditIcon } from "react-icons/md"
import { User } from "db"
import { EditUserModal } from "./EditUserModal"

interface EditUserButtonProps {
  user: User
}

export const EditUserButton = ({ user }: EditUserButtonProps) => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <ActionIcon onClick={() => setOpened(true)}>
        <EditIcon size={16} />
      </ActionIcon>
      {opened && <EditUserModal opened={opened} onClose={() => setOpened(false)} user={user} />}
    </>
  )
}
