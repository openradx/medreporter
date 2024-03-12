import { ActionIcon } from "@mantine/core"
import { User } from "@prisma/client"
import { Pencil as EditIcon } from "lucide-react"
import { useState } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { EditUserModal } from "./EditUserModal"

interface EditUserButtonProps {
  user: User
}

export const EditUserButton = ({ user }: EditUserButtonProps) => {
  const { t } = useSiteTranslation()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <ActionIcon
        title={t("EditUserButton.buttonEditUser")}
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
