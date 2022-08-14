import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { Button, Group, Modal, Stack } from "@mantine/core"
import { User } from "db"
import { SUBMIT_FORM_ERROR } from "app/core/components/common/SubmitForm"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
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
    <Modal title={t("EditUserModal.title")} opened={opened} onClose={onClose}>
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
              invalidateQuery(getUsers)
              onClose()
              return null
            } catch (error) {
              if (uniqueConstraintFailed(error, "email")) {
                return { email: t("EditUserModal.duplicateEmail") }
              }
              return { [SUBMIT_FORM_ERROR]: (error as Error).toString() }
            }
          }}
        />
        <Group position="right">
          <Button variant="default" onClick={onClose}>
            {t("general.buttons.cancel")}
          </Button>
          <Button form="edit-user-form" type="submit">
            {t("general.buttons.save")}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
