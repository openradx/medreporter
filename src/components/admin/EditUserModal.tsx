import { Trans, useLingui } from "@lingui/react/macro"
import { Button, Group, Modal, Stack } from "@mantine/core"
import { User } from "@prisma/client"
import { TRPCClientError } from "@trpc/client"
import { FormSubmitError } from "~/utils/formErrors"
import { trpc } from "~/utils/trpc"
import { UpdateUserSchema } from "~/validations/admin"
import { UserForm } from "./UserForm"

interface EditUserModalProps {
  user: User
  opened: boolean
  onClose: () => void
}

export const EditUserModal = ({ user, opened, onClose }: EditUserModalProps) => {
  const { t } = useLingui()
  const updateUser = trpc.admin.updateUser.useMutation()
  const utils = trpc.useUtils()

  return (
    <Modal title={t`Edit user`} opened={opened} onClose={onClose}>
      <Stack>
        <UserForm
          id="edit-user-form"
          schema={UpdateUserSchema.omit({ id: true })}
          initialValues={{
            username: user.username!,
            email: user.email!,
            password: "",
            role: user.role,
          }}
          onSubmit={async (values) => {
            try {
              await updateUser.mutateAsync({ id: user.id, ...values })
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
          <Button variant="outline" form="edit-user-form" type="submit">
            <Trans>Save</Trans>
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
