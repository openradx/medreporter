import { Button, Group, Modal, Stack } from "@mantine/core"
import { TRPCClientError } from "@trpc/client"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { FormSubmitError } from "~/utils/formErrors"
import { trpc } from "~/utils/trpc"
import { CreateInstituteSchema } from "~/validations/admin"
import { InstituteForm } from "./InstituteForm"

interface AddInstituteModalProps {
  opened: boolean
  onClose: () => void
}

export const AddInstituteModal = ({ opened, onClose }: AddInstituteModalProps) => {
  const { t } = useSiteTranslation()
  const createInstitute = trpc.admin.createInstitute.useMutation()
  const utils = trpc.useContext()

  return (
    <Modal title={t("AddInstituteModal.formTitle")} opened={opened} onClose={onClose}>
      <Stack>
        <InstituteForm
          id="add-institute-form"
          schema={CreateInstituteSchema}
          initialValues={{ name: "" }}
          onSubmit={async (values) => {
            try {
              await createInstitute.mutateAsync(values)
              utils.admin.getInstitutes.invalidate()
              onClose()
            } catch (error) {
              if (error instanceof TRPCClientError) {
                if (error.message.match(/Unique constrained failed.*"name"/)) {
                  throw new FormSubmitError({ name: t("AddInstituteModal.messageDuplicateName") })
                }
              }
              if (error instanceof Error) {
                throw new FormSubmitError(`t("formError.unexpected" ${error.message}`)
              }
              throw error
            }
          }}
        />
        <Group justify="flex-end">
          <Button variant="transparent" onClick={onClose}>
            {t("general.buttonCancel")}
          </Button>
          <Button variant="outline" form="add-institute-form" type="submit">
            {t("general.buttonAdd")}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
