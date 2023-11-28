import { Button, Group, Modal, Stack } from "@mantine/core"
import { Institute } from "@prisma/client"
import { TRPCClientError } from "@trpc/client"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { FormSubmitError } from "~/utils/formErrors"
import { trpc } from "~/utils/trpc"
import { UpdateInstituteSchema } from "~/validations/admin"
import { InstituteForm } from "./InstituteForm"

interface EditInstituteModalProps {
  institute: Institute
  opened: boolean
  onClose: () => void
}

export const EditInstituteModal = ({ institute, opened, onClose }: EditInstituteModalProps) => {
  const { t } = useSiteTranslation()
  const updateInstitute = trpc.admin.updateInstitute.useMutation()
  const utils = trpc.useContext()

  return (
    <Modal title={t("EditInstituteModal.formTitle")} opened={opened} onClose={onClose}>
      <Stack>
        <InstituteForm
          id="edit-institute-form"
          schema={UpdateInstituteSchema.omit({ id: true })}
          initialValues={{ name: institute.name }}
          onSubmit={async (values) => {
            try {
              await updateInstitute.mutateAsync({ id: institute.id, ...values })
              utils.admin.getInstitutes.invalidate()
              onClose()
            } catch (error) {
              if (error instanceof TRPCClientError) {
                if (error.message.match(/Unique constrained failed.*"name"/)) {
                  throw new FormSubmitError({ name: t("EditInstituteModal.messageDuplicateName") })
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
          <Button variant="outline" form="edit-institute-form" type="submit">
            {t("general.buttonSave")}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
