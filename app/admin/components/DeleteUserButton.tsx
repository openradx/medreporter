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
      color="red"
      onClick={() =>
        openConfirmModal({
          title: t("DeleteUserButton.confirmDialogTitle"),
          children: (
            <Text>{t("DeleteUserButton.confirmDialogMessage", { username: user.username })}</Text>
          ),
          labels: {
            confirm: t("general.buttons.delete"),
            cancel: t("general.buttons.cancel"),
          },
          confirmProps: { color: "red" },
          onConfirm: async () => {
            try {
              await deleteUserMutation({ id: user.id })
              await invalidateQuery(getUsers)
            } catch (error) {
              const { message } = error as Error
              openModal({
                title: t("general.errors.errorTitle"),
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
