import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { Button, Group, Modal, Stack } from "@mantine/core"
import { SUBMIT_FORM_ERROR } from "app/core/components/common/SubmitForm"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
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
    <Modal title={t("AddInstituteModal.title")} opened={opened} onClose={onClose}>
      <Stack>
        <InstituteForm
          id="add-institute-form"
          schema={CreateInstitute}
          initialValues={{ name: "" }}
          onSubmit={async (values) => {
            try {
              await createInstituteMutation(values)
              invalidateQuery(getInstitutes)
              onClose()
              return null
            } catch (error) {
              if (uniqueConstraintFailed(error, "name")) {
                return { name: t("AddInstituteModal.duplicateName") }
              }
              return { [SUBMIT_FORM_ERROR]: (error as Error).toString() }
            }
          }}
        />
        <Group position="right">
          <Button variant="default" onClick={onClose}>
            {t("general.buttons.cancel")}
          </Button>
          <Button form="add-institute-form" type="submit">
            {t("general.buttons.add")}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
