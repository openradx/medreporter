import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { Button, Group, Modal, Stack } from "@mantine/core"
import { Institute } from "db"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { FormSubmitError } from "app/core/utils/formErrors"
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
    <Modal title={t("EditInstituteModal.formTitle")} opened={opened} onClose={onClose}>
      <Stack>
        <InstituteForm
          id="edit-institute-form"
          schema={UpdateInstitute.omit({ id: true })}
          initialValues={{ name: institute.name }}
          onSubmit={async (values) => {
            try {
              await updateInstituteMutation({ id: institute.id, ...values })
              invalidateQuery(getInstitutes, {})
              onClose()
            } catch (e) {
              if (uniqueConstraintFailed(e, "name")) {
                throw new FormSubmitError({ name: t("EditInstituteModal.messageDuplicateName") })
              }
              if (e instanceof Error) {
                throw new FormSubmitError(t("formError.unexpected") + e.message)
              }
              throw e
            }
          }}
        />
        <Group position="right">
          <Button variant="default" onClick={onClose}>
            {t("general.buttonCancel")}
          </Button>
          <Button form="edit-institute-form" type="submit">
            {t("general.buttonSave")}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
