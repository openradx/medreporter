import { Button, Group, Modal, Stack } from "@mantine/core"
import { UserRole } from "@prisma/client"
import { TRPCClientError } from "@trpc/client"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { FormSubmitError } from "~/utils/formErrors"
import { trpc } from "~/utils/trpc"
import { CreateUserSchema } from "~/validations/admin"
import { UserForm } from "./UserForm"

interface AddUserModalProps {
  opened: boolean
  onClose: () => void
}

export const AddUserModal = ({ opened, onClose }: AddUserModalProps) => {
  const { t } = useSiteTranslation()
  const createUser = trpc.admin.createUser.useMutation()
  const utils = trpc.useContext()

  return (
    <Modal title={t("AddUserModal.formTitle")} opened={opened} onClose={onClose}>
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
                  throw new FormSubmitError({ email: t("AddUserModal.messageDuplicateUsername") })
                }
                if (error.message.match(/Unique constrained failed.*"email"/)) {
                  throw new FormSubmitError({ email: t("AddUserModal.messageDuplicateEmail") })
                }
              }
              throw error
            }
          }}
        />
        <Group justify="flex-end">
          <Button variant="default" onClick={onClose}>
            {t("general.buttonCancel")}
          </Button>
          <Button form="add-user-form" type="submit">
            {t("general.buttonAdd")}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
