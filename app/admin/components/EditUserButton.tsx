import { ActionIcon } from "@mantine/core"
import { useState } from "react"
import { MdEdit as EditIcon } from "react-icons/md"
import { User } from "db"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { EditUserModal } from "./EditUserModal"

interface EditUserButtonProps {
  user: User
}

export const EditUserButton = ({ user }: EditUserButtonProps) => {
  const { t } = useSiteTranslation()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <ActionIcon title={t("EditUserButton.actionTitle")} onClick={() => setOpened(true)}>
        <EditIcon size={16} />
      </ActionIcon>
      {opened && <EditUserModal opened={opened} onClose={() => setOpened(false)} user={user} />}
    </>
  )
}
