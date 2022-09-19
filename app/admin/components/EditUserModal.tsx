import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { Button, Group, Modal, Stack } from "@mantine/core"
import { User } from "db"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { FormSubmitError } from "app/core/utils/formErrors"
import { uniqueConstraintFailed } from "app/core/utils/mutationUtils"
import updateUser from "../mutations/updateUser"
import getUsers from "../queries/getUsers"
import { UpdateUser } from "../validations"
import { UserForm } from "./UserForm"

interface EditUserModalProps {
  user: User
  opened: boolean
  onClose: () => void
}

export const EditUserModal = ({ user, opened, onClose }: EditUserModalProps) => {
  const { t } = useSiteTranslation()
  const [updateUserMutation] = useMutation(updateUser)

  return (
    <Modal title={t("EditUserModal.formTitle")} opened={opened} onClose={onClose}>
      <Stack>
        <UserForm
          id="edit-user-form"
          schema={UpdateUser.omit({ id: true })}
          initialValues={{
            username: user.username,
            email: user.email,
            password: "",
            role: user.role,
          }}
          onSubmit={async (values) => {
            try {
              await updateUserMutation({ id: user.id, ...values })
              invalidateQuery(getUsers, {})
              onClose()
            } catch (e) {
              if (uniqueConstraintFailed(e, "email")) {
                throw new FormSubmitError({ email: t("EditUserModal.messageDuplicateEmail") })
              }
              if (e instanceof Error) {
                throw new FormSubmitError(t("formError.unexpected") + e.message)
              }
              throw e
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
