import { ActionIcon, Text } from "@mantine/core"
import { openConfirmModal, openModal } from "@mantine/modals"
import { User } from "@prisma/client"
import { MdDelete as DeleteIcon } from "react-icons/md"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { trpc } from "~/utils/trpc"

interface DeleteUserButtonProps {
  user: User
}

export const DeleteUserButton = ({ user }: DeleteUserButtonProps) => {
  const { t } = useSiteTranslation()
  const deleteUser = trpc.admin.deleteUser.useMutation()
  const utils = trpc.useUtils()

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
              await deleteUser.mutateAsync({ id: user.id })
              utils.admin.getUsers.invalidate()
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
