import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { Button, Group, Modal, Stack } from "@mantine/core"
import { FormSubmitError } from "app/core/utils/formErrors"
import { UserRole } from "../../../db"
import { useSiteTranslation } from "../../core/hooks/useSiteTranslation"
import { uniqueConstraintFailed } from "../../core/utils/mutationUtils"
import createUser from "../mutations/createUser"
import getUsers from "../queries/getUsers"
import { CreateUser } from "../validations"
import { UserForm } from "./UserForm"

interface AddUserModalProps {
  opened: boolean
  onClose: () => void
}

export const AddUserModal = ({ opened, onClose }: AddUserModalProps) => {
  const { t } = useSiteTranslation()
  const [createUserMutation] = useMutation(createUser)

  return (
    <Modal title={t("AddUserModal.formTitle")} opened={opened} onClose={onClose}>
      <Stack>
        <UserForm
          id="add-user-form"
          schema={CreateUser}
          initialValues={{ username: "", email: "", password: "", role: UserRole.USER }}
          onSubmit={async (values) => {
            try {
              await createUserMutation(values)
              invalidateQuery(getUsers, {})
              onClose()
            } catch (e) {
              if (uniqueConstraintFailed(e, "email")) {
                throw new FormSubmitError({ email: t("AddUserModal.messageDuplicateEmail") })
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
          <Button form="add-user-form" type="submit">
            {t("general.buttonAdd")}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
