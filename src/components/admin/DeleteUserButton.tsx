import { Trans, useLingui } from "@lingui/react/macro"
import { ActionIcon, Text } from "@mantine/core"
import { openConfirmModal, openModal } from "@mantine/modals"
import { User } from "@prisma/client"
import { Trash2 as DeleteIcon } from "lucide-react"
import { trpc } from "~/utils/trpc"

interface DeleteUserButtonProps {
  user: User
}

export const DeleteUserButton = ({ user }: DeleteUserButtonProps) => {
  const { t } = useLingui()

  const deleteUser = trpc.admin.deleteUser.useMutation()
  const utils = trpc.useUtils()

  return (
    <ActionIcon
      title={t`Delete user`}
      variant="subtle"
      color="red"
      onClick={() =>
        openConfirmModal({
          title: t`Delete user`,
          children: (
            <Text>
              <Trans>Do you really want to delete the user {user.username}?</Trans>
            </Text>
          ),
          labels: {
            confirm: t`Delete`,
            cancel: t`Cancel`,
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
                  title: t`An error occurred.`,
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
