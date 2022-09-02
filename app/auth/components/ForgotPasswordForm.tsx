import { useMutation } from "@blitzjs/rpc"
import { Alert, Stack, TextInput, Title } from "@mantine/core"
import { Controller } from "react-hook-form"
import { SubmitForm, SUBMIT_FORM_ERROR } from "../../core/components/common/SubmitForm"
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
              return null
            } catch (error) {
              return {
                [SUBMIT_FORM_ERROR]: t("general.errorTextUnknown"),
              }
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
