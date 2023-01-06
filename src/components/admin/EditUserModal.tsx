import { Button, Group, Modal, Stack } from "@mantine/core"
import { User } from "@prisma/client"
import { TRPCClientError } from "@trpc/client"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
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
  const { t } = useSiteTranslation()
  const updateUser = trpc.admin.updateUser.useMutation()
  const utils = trpc.useContext()

  return (
    <Modal title={t("EditUserModal.formTitle")} opened={opened} onClose={onClose}>
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
                  throw new FormSubmitError({ email: t("EditUserModal.messageDuplicateUsername") })
                }
                if (error.message.match(/Unique constrained failed.*"email"/)) {
                  throw new FormSubmitError({ email: t("EditUserModal.messageDuplicateEmail") })
                }
              }
              if (error instanceof Error) {
                throw new FormSubmitError(t("formError.unexpected") + error.message)
              }
              throw error
            }
          }}
        />
        <Group position="right">
          <Button variant="default" onClick={onClose}>
            {t("general.buttonCancel")}
          </Button>
          <Button form="edit-user-form" type="submit">
            {t("general.buttonSave")}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
