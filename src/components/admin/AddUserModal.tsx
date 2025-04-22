import { Button, Group, Modal, Stack } from "@mantine/core"
import { TRPCClientError } from "@trpc/client"
import { authClient } from "~/auth-client"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { FormSubmitError } from "~/utils/formErrors"
import { CreateUserSchema } from "~/validations/admin"
import { UserForm } from "./UserForm"

interface AddUserModalProps {
  opened: boolean
  onClose: () => void
}

export const AddUserModal = ({ opened, onClose }: AddUserModalProps) => {
  const { t } = useSiteTranslation()

  return (
    <Modal title={t("AddUserModal.formTitle")} opened={opened} onClose={onClose}>
      <Stack>
        <UserForm
          id="add-user-form"
          schema={CreateUserSchema}
          initialValues={{ username: "", email: "", password: "", role: UserRole.USER }}
          onSubmit={async (values) => {
            try {
              await authClient.admin.createUser({
                email: values.email,
                password: values.password,
                name: values.fullName,
                role: "user",
                data: {
                  username: values.username,
                  fullName: values.fullName,
                },
              })
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
          <Button variant="transparent" onClick={onClose}>
            {t("general.buttonCancel")}
          </Button>
          <Button variant="outline" form="add-user-form" type="submit">
            {t("general.buttonAdd")}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
