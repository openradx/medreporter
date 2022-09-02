import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { ActionIcon, Text } from "@mantine/core"
import { openConfirmModal, openModal } from "@mantine/modals"
import { MdDelete as DeleteIcon } from "react-icons/md"
import { User } from "db"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import deleteUser from "../mutations/deleteUser"
import getUsers from "../queries/getUsers"

interface DeleteUserButtonProps {
  user: User
}

export const DeleteUserButton = ({ user }: DeleteUserButtonProps) => {
  const { t } = useSiteTranslation()
  const [deleteUserMutation] = useMutation(deleteUser)

  return (
    <ActionIcon
      title={t("DeleteUserButton.actionTitle")}
      color="red"
      onClick={() =>
        openConfirmModal({
          title: t("DeleteUserButton.confirmDialogTitle"),
          children: (
            <Text>{t("DeleteUserButton.confirmDialogMessage", { username: user.username })}</Text>
          ),
          labels: {
            confirm: t("general.buttonDelete"),
            cancel: t("general.buttonCancel"),
          },
          confirmProps: { color: "red" },
          onConfirm: async () => {
            try {
              await deleteUserMutation({ id: user.id })
              invalidateQuery(getUsers, {})
            } catch (error) {
              const { message } = error as Error
              openModal({
                title: t("general.errorTitle"),
                children: message,
              })
            }
          },
        })
      }
    >
      <DeleteIcon size={18} filter="saturate(90%)" />
    </ActionIcon>
  )
}
