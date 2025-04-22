import { ActionIcon, Text } from "@mantine/core"
import { openConfirmModal, openModal } from "@mantine/modals"
import { User } from "@prisma/client"
import { Trash2 as DeleteIcon } from "lucide-react"
import { authClient } from "~/auth-client"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

interface DeleteUserButtonProps {
  user: User
}

export const DeleteUserButton = ({ user }: DeleteUserButtonProps) => {
  const { t } = useSiteTranslation()

  return (
    <ActionIcon
      title={t("DeleteUserButton.buttonDeleteUser")}
      variant="subtle"
      color="red"
      onClick={() =>
        openConfirmModal({
          title: t("DeleteUserButton.titleConfirmDialog"),
          children: (
            <Text>{t("DeleteUserButton.messageConfirmDialog", { username: user.username })}</Text>
          ),
          labels: {
            confirm: t("general.buttonDelete"),
            cancel: t("general.buttonCancel"),
          },
          confirmProps: { color: "red", variant: "outline" },
          cancelProps: { color: "gray", variant: "transparent" },
          onConfirm: async () => {
            try {
              await authClient.admin.removeUser({
                userId: user.id,
              })
            } catch (error) {
              if (error instanceof Error) {
                openModal({
                  title: t("general.errorTitle"),
                  children: error.message,
                })
              }
              throw error
            }
          },
        })
      }
    >
      <DeleteIcon size={18} filter="saturate(90%)" />
    </ActionIcon>
  )
}
