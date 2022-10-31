import { useMutation } from "@blitzjs/rpc"
import { Alert, Stack, TextInput, Title } from "@mantine/core"
import { Controller } from "react-hook-form"
import { FormSubmitError } from "app/core/utils/formErrors"
import { SubmitForm } from "../../core/components/common/SubmitForm"
import { useSiteTranslation } from "../../core/hooks/useSiteTranslation"
import forgotPassword from "../mutations/forgotPassword"
import { ForgotPassword } from "../validations"

export const ForgotPasswordForm = () => {
  const { t } = useSiteTranslation()
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <Stack spacing="md">
      <Title order={3}>{t("ForgotPasswordForm.formTitle")}</Title>
      {isSuccess ? (
        <Alert title={t("ForgotPasswordForm.messageSubmitted")} color="green">
          {t("ForgotPasswordForm.messageEmail")}
        </Alert>
      ) : (
        <SubmitForm
          submitText={t("ForgotPasswordForm.buttonSend")}
          schema={ForgotPassword}
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            try {
              await forgotPasswordMutation(values)
            } catch (e) {
              if (e instanceof Error) {
                throw new FormSubmitError(t("formError.unexpected") + e.message)
              }
              throw e
            }
          }}
        >
          <Controller
            name="email"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                label={t("ForgotPasswordForm.inputLabelEmail")}
                value={value}
                onChange={onChange}
                error={error ? error.message : null}
              />
            )}
          />
        </SubmitForm>
      )}
    </Stack>
  )
}
