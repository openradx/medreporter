import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { Button, Group, Modal, Stack } from "@mantine/core"
import { UserRole } from "../../../db"
import { SUBMIT_FORM_ERROR } from "../../core/components/common/SubmitForm"
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
    <Modal title={t("AddUserModal.title")} opened={opened} onClose={onClose}>
      <Stack>
        <UserForm
          id="add-user-form"
          schema={CreateUser}
          initialValues={{ username: "", email: "", password: "", role: UserRole.USER }}
          onSubmit={async (values) => {
            try {
              await createUserMutation(values)
              invalidateQuery(getUsers)
              onClose()
              return null
            } catch (error) {
              if (uniqueConstraintFailed(error, "email")) {
                return { email: t("AddUserModal.duplicateEmail") }
              }
              return { [SUBMIT_FORM_ERROR]: (error as Error).toString() }
            }
          }}
        />
        <Group position="right">
          <Button variant="default" onClick={onClose}>
            {t("general.buttons.cancel")}
          </Button>
          <Button form="add-user-form" type="submit">
            {t("general.buttons.add")}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
