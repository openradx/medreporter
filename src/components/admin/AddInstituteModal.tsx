import { Trans, useLingui } from "@lingui/react/macro"
import { Button, Group, Modal, Stack } from "@mantine/core"
import { TRPCClientError } from "@trpc/client"
import { FormSubmitError } from "~/utils/formErrors"
import { trpc } from "~/utils/trpc"
import { CreateInstituteSchema } from "~/validations/admin"
import { InstituteForm } from "./InstituteForm"

interface AddInstituteModalProps {
  opened: boolean
  onClose: () => void
}

export const AddInstituteModal = ({ opened, onClose }: AddInstituteModalProps) => {
  const { t } = useLingui()
  const createInstitute = trpc.admin.createInstitute.useMutation()
  const utils = trpc.useUtils()

  return (
    <Modal title={t`Add institute`} opened={opened} onClose={onClose}>
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
                  throw new FormSubmitError({ name: t`Institute name already exists` })
                }
              }
              if (error instanceof Error) {
                throw new FormSubmitError(t`An error occurred: ${error.message}`)
              }
              throw error
            }
          }}
        />
        <Group justify="flex-end">
          <Button variant="transparent" onClick={onClose}>
            <Trans>Cancel</Trans>
          </Button>
          <Button variant="outline" form="add-institute-form" type="submit">
            <Trans>Add</Trans>
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
