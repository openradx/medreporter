import { Alert, Stack, TextInput, Title } from "@mantine/core"
import { TRPCClientError } from "@trpc/client"
import { useRouter } from "next/router"
import { Controller } from "react-hook-form"
import { SubmitForm } from "~/components/common/SubmitForm"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { FormSubmitError } from "~/utils/formErrors"
import { trpc } from "~/utils/trpc"
import { ResetPasswordSchema } from "~/validations/auth"
import { LoginLink } from "./LoginLink"

export const ResetPasswordForm = () => {
  const { t } = useSiteTranslation()
  const router = useRouter()
  const resetPassword = trpc.auth.resetPassword.useMutation()

  const email = router.query.email as string
  const token = router.query.token as string

  return (
    <Stack gap="md">
      <Title order={3}>{t("ResetPasswordForm.formTitle")}</Title>
      {resetPassword.isSuccess ? (
        <Alert title={t("ResetPasswordForm.messageSuccess")}>
          {t("ResetPasswordForm.textRedirect")} <LoginLink />
        </Alert>
      ) : (
        <SubmitForm
          submitText={t("ResetPasswordForm.buttonReset")}
          schema={ResetPasswordSchema}
          initialValues={{
            email,
            token,
            password: "",
            passwordConfirmation: "",
          }}
          onSubmit={async (values) => {
            try {
              await resetPassword.mutateAsync(values)
            } catch (error) {
              if (error instanceof TRPCClientError) {
                if (error.message.match(/Invalid token/) || error.message.match(/token expired/)) {
                  throw new FormSubmitError(t("ResetPasswordForm.messageError"))
                }
              }
              if (error instanceof Error) {
                throw new FormSubmitError(t("formError.unexpected") + error.message)
              }
              throw error
            }
          }}
        >
          <Stack gap={2}>
            <Controller
              name="password"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextInput
                  label={t("ResetPasswordForm.inputLabelNewPassword")}
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                  type="password"
                  required
                />
              )}
            />
            <Controller
              name="passwordConfirmation"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextInput
                  label={t("ResetPasswordForm.inputLabelConfirmPassword")}
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                  type="password"
                  required
                />
              )}
            />
          </Stack>
        </SubmitForm>
      )}
    </Stack>
  )
}

export default ResetPasswordForm
