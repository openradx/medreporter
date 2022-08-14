import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { Button, Group, Modal, Stack } from "@mantine/core"
import { Institute } from "db"
import { SUBMIT_FORM_ERROR } from "app/core/components/common/SubmitForm"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { uniqueConstraintFailed } from "app/core/utils/mutationUtils"
import updateInstitute from "../mutations/updateInstitute"
import getInstitutes from "../queries/getInstitutes"
import { UpdateInstitute } from "../validations"
import { InstituteForm } from "./InstituteForm"

interface EditInstituteModalProps {
  institute: Institute
  opened: boolean
  onClose: () => void
}

export const EditInstituteModal = ({ institute, opened, onClose }: EditInstituteModalProps) => {
  const { t } = useSiteTranslation()
  const [updateInstituteMutation] = useMutation(updateInstitute)

  return (
    <Modal title={t("EditInstituteModal.title")} opened={opened} onClose={onClose}>
      <Stack>
        <InstituteForm
          id="edit-institute-form"
          schema={UpdateInstitute.omit({ id: true })}
          initialValues={{ name: institute.name }}
          onSubmit={async (values) => {
            try {
              await updateInstituteMutation({ id: institute.id, ...values })
              invalidateQuery(getInstitutes)
              onClose()
              return null
            } catch (error) {
              if (uniqueConstraintFailed(error, "name")) {
                return { name: t("EditInstituteModal.duplicateName") }
              }
              return { [SUBMIT_FORM_ERROR]: (error as Error).toString() }
            }
          }}
        />
        <Group position="right">
          <Button variant="default" onClick={onClose}>
            {t("general.buttons.cancel")}
          </Button>
          <Button form="edit-institute-form" type="submit">
            {t("general.buttons.save")}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
