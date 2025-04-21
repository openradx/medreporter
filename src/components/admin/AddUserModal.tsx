import { Trans, useLingui } from "@lingui/react/macro"
import { Button, Group, Modal, Stack } from "@mantine/core"
import { UserRole } from "@prisma/client"
import { TRPCClientError } from "@trpc/client"
import { FormSubmitError } from "~/utils/formErrors"
import { trpc } from "~/utils/trpc"
import { CreateUserSchema } from "~/validations/admin"
import { UserForm } from "./UserForm"

interface AddUserModalProps {
  opened: boolean
  onClose: () => void
}

export const AddUserModal = ({ opened, onClose }: AddUserModalProps) => {
  const { t } = useLingui()
  const createUser = trpc.admin.createUser.useMutation()
  const utils = trpc.useUtils()

  return (
    <Modal title={t`Add user`} opened={opened} onClose={onClose}>
      <Stack>
        <UserForm
          id="add-user-form"
          schema={CreateUserSchema}
          initialValues={{ username: "", email: "", password: "", role: UserRole.USER }}
          onSubmit={async (values) => {
            try {
              await createUser.mutateAsync(values)
              utils.admin.getUsers.invalidate()
              onClose()
            } catch (error) {
              if (error instanceof TRPCClientError) {
                if (error.message.match(/Unique constrained failed.*"username"/)) {
                  throw new FormSubmitError({ email: t`This username is already being used.` })
                }
                if (error.message.match(/Unique constrained failed.*"email"/)) {
                  throw new FormSubmitError({ email: t`This email is already being used.` })
                }
              }
              throw error
            }
          }}
        />
        <Group justify="flex-end">
          <Button variant="transparent" onClick={onClose}>
            <Trans>Cancel</Trans>
          </Button>
          <Button variant="outline" form="add-user-form" type="submit">
            <Trans>Add</Trans>
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
