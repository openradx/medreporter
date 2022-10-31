import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { Button, Group, Modal, Stack } from "@mantine/core"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { FormSubmitError } from "app/core/utils/formErrors"
import { uniqueConstraintFailed } from "app/core/utils/mutationUtils"
import createInstitute from "../mutations/createInstitute"
import getInstitutes from "../queries/getInstitutes"
import { CreateInstitute } from "../validations"
import { InstituteForm } from "./InstituteForm"

interface AddInstituteModalProps {
  opened: boolean
  onClose: () => void
}

export const AddInstituteModal = ({ opened, onClose }: AddInstituteModalProps) => {
  const { t } = useSiteTranslation()
  const [createInstituteMutation] = useMutation(createInstitute)

  return (
    <Modal title={t("AddInstituteModal.formTitle")} opened={opened} onClose={onClose}>
      <Stack>
        <InstituteForm
          id="add-institute-form"
          schema={CreateInstitute}
          initialValues={{ name: "" }}
          onSubmit={async (values) => {
            try {
              await createInstituteMutation(values)
              invalidateQuery(getInstitutes, {})
              onClose()
              return undefined
            } catch (e) {
              if (uniqueConstraintFailed(e, "name")) {
                throw new FormSubmitError({ name: t("AddInstituteModal.messageDuplicateName") })
              }
              if (e instanceof Error) {
                throw new FormSubmitError((e as Error).toString())
              }
              throw e
            }
          }}
        />
        <Group position="right">
          <Button variant="default" onClick={onClose}>
            {t("general.buttonCancel")}
          </Button>
          <Button form="add-institute-form" type="submit">
            {t("general.buttonAdd")}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
