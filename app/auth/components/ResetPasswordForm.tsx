import { Routes, useRouterQuery } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Alert, Stack, TextInput, Title } from "@mantine/core"
import { Controller } from "react-hook-form"
import { PageLink } from "../../core/components/common/PageLink"
import { SubmitForm, SUBMIT_FORM_ERROR } from "../../core/components/common/SubmitForm"
import { useSiteTranslation } from "../../core/hooks/useSiteTranslation"
import resetPassword from "../mutations/resetPassword"
import { ResetPassword } from "../validations"

export const ResetPasswordForm = () => {
  const { t } = useSiteTranslation()
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <Stack spacing="md">
      <Title order={3}>{t("ResetPasswordForm.title")}</Title>
      {isSuccess ? (
        <Alert title={t("ResetPasswordForm.success")}>
          {t("ResetPasswordForm.redirect")}{" "}
          <PageLink route={Routes.HomePage()}>{t("ResetPasswordForm.homepage")}</PageLink>
        </Alert>
      ) : (
        <SubmitForm
          submitText={t("ResetPasswordForm.reset")}
          schema={ResetPassword}
          initialValues={{ password: "", passwordConfirmation: "", token: query.token as string }}
          onSubmit={async (values) => {
            try {
              await resetPasswordMutation(values)
              return true
            } catch (error) {
              const err = error as Error
              if (err.name === "ResetPasswordError") {
                return { [SUBMIT_FORM_ERROR]: err.message }
              }
              return { [SUBMIT_FORM_ERROR]: t("general.errors.unknownError") }
            }
          }}
        >
          <Stack spacing={2}>
            <Controller
              name="password"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextInput
                  label={t("ResetPasswordForm.newPasswordLabel")}
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
                  label={t("ResetPasswordForm.confirmPasswordLabel")}
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
