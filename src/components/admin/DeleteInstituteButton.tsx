import { Trans, useLingui } from "@lingui/react/macro"
import { ActionIcon, Text } from "@mantine/core"
import { openConfirmModal, openModal } from "@mantine/modals"
import { Institute } from "@prisma/client"
import { Trash2 as DeleteIcon } from "lucide-react"
import { trpc } from "~/utils/trpc"

interface DeleteInstituteButtonProps {
  institute: Institute
}

export const DeleteInstituteButton = ({ institute }: DeleteInstituteButtonProps) => {
  const { t } = useLingui()
  const deleteInstitute = trpc.admin.deleteInstitute.useMutation()
  const utils = trpc.useUtils()

  return (
    <ActionIcon
      title={t`Delete institute`}
      variant="subtle"
      color="red"
      onClick={() =>
        openConfirmModal({
          title: t`Delete institute`,
          children: (
            <Text>
              <Trans>Do you really want to delete the institute {institute.name}?</Trans>
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
              await deleteInstitute.mutateAsync({ id: institute.id })
              utils.admin.getInstitutes.invalidate()
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
