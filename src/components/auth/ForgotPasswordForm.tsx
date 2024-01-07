import { Alert, Stack, TextInput, Title } from "@mantine/core"
import { Controller } from "react-hook-form"
import { SubmitForm } from "~/components/common/SubmitForm"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { FormSubmitError } from "~/utils/formErrors"
import { trpc } from "~/utils/trpc"
import { ForgotPasswordSchema } from "~/validations/auth"

export const ForgotPasswordForm = () => {
  const { t } = useSiteTranslation()
  const forgotPassword = trpc.auth.forgotPassword.useMutation()

  return (
    <Stack gap="md">
      <Title order={3}>{t("ForgotPasswordForm.formTitle")}</Title>
      {forgotPassword.isSuccess && (
        <Alert title={t("ForgotPasswordForm.messageSubmitted")} color="green">
          {t("ForgotPasswordForm.messageEmail")}
        </Alert>
      )}
      {forgotPassword.isIdle && (
        <SubmitForm
          submitText={t("ForgotPasswordForm.buttonSend")}
          schema={ForgotPasswordSchema}
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            try {
              await forgotPassword.mutateAsync(values)
            } catch (error) {
              if (error instanceof Error) {
                throw new FormSubmitError(t("formError.unexpected") + error.message)
              }
              throw error
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
                error={error?.message}
              />
            )}
          />
        </SubmitForm>
      )}
    </Stack>
  )
}
