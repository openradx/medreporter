import { ActionIcon, Text } from "@mantine/core"
import { openConfirmModal, openModal } from "@mantine/modals"
import { Institute } from "@prisma/client"
import { MdDelete as DeleteIcon } from "react-icons/md"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { trpc } from "~/utils/trpc"

interface DeleteInstituteButtonProps {
  institute: Institute
}

export const DeleteInstituteButton = ({ institute }: DeleteInstituteButtonProps) => {
  const { t } = useSiteTranslation()
  const deleteInstitute = trpc.admin.deleteInstitute.useMutation()
  const utils = trpc.useUtils()

  return (
    <ActionIcon
      title={t("DeleteInstituteButton.buttonDeleteInstitute")}
      variant="subtle"
      color="red"
      onClick={() =>
        openConfirmModal({
          title: t("DeleteInstituteButton.titleConfirmDialog"),
          children: (
            <Text>{t("DeleteInstituteButton.messageConfirmDialog", { name: institute.name })}</Text>
          ),
          labels: {
            confirm: t("general.buttonDelete"),
            cancel: t("general.buttonCancel"),
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
