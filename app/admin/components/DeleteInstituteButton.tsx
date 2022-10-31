import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { ActionIcon, Text } from "@mantine/core"
import { openConfirmModal, openModal } from "@mantine/modals"
import { MdDelete as DeleteIcon } from "react-icons/md"
import { Institute } from "db"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import deleteInstitute from "../mutations/deleteInstitute"
import getInstitutes from "../queries/getInstitutes"

interface DeleteInstituteButtonProps {
  institute: Institute
}

export const DeleteInstituteButton = ({ institute }: DeleteInstituteButtonProps) => {
  const { t } = useSiteTranslation()
  const [deleteInstituteMutation] = useMutation(deleteInstitute)

  return (
    <ActionIcon
      title={t("DeleteInstituteButton.buttonDeleteInstitute")}
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
          confirmProps: { color: "red" },
          onConfirm: async () => {
            try {
              await deleteInstituteMutation({ id: institute.id })
              invalidateQuery(getInstitutes)
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
