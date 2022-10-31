import { Routes, useRouterQuery } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Alert, Stack, TextInput, Title } from "@mantine/core"
import { Controller } from "react-hook-form"
import { FormSubmitError } from "app/core/utils/formErrors"
import { PageLink } from "../../core/components/common/PageLink"
import { SubmitForm } from "../../core/components/common/SubmitForm"
import { useSiteTranslation } from "../../core/hooks/useSiteTranslation"
import resetPassword, { ResetPasswordError } from "../mutations/resetPassword"
import { ResetPassword } from "../validations"

export const ResetPasswordForm = () => {
  const { t } = useSiteTranslation()
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <Stack spacing="md">
      <Title order={3}>{t("ResetPasswordForm.formTitle")}</Title>
      {isSuccess ? (
        <Alert title={t("ResetPasswordForm.messageSuccess")}>
          {t("ResetPasswordForm.textRedirect")}{" "}
          <PageLink route={Routes.HomePage()}>{t("ResetPasswordForm.linkHomepage")}</PageLink>
        </Alert>
      ) : (
        <SubmitForm
          submitText={t("ResetPasswordForm.buttonReset")}
          schema={ResetPassword}
          initialValues={{ password: "", passwordConfirmation: "", token: query.token as string }}
          onSubmit={async (values) => {
            try {
              await resetPasswordMutation(values)
            } catch (e) {
              if (e instanceof ResetPasswordError) {
                throw new FormSubmitError(t("ResetPasswordForm.messageError"))
              }
              if (e instanceof Error) {
                throw new FormSubmitError(t("formError.unexpected") + e.message)
              }
              throw e
            }
          }}
        >
          <Stack spacing={2}>
            <Controller
              name="password"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextInput
                  label={t("ResetPasswordForm.inputLabelNewPassword")}
                  value={value}
                  onChange={onChange}
                  error={error ? error.message : null}
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
                  error={error ? error.message : null}
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
