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
      <Title order={3}>{t("ResetPasswordForm.form_title")}</Title>
      {isSuccess ? (
        <Alert title={t("ResetPasswordForm.message_success")}>
          {t("ResetPasswordForm.text_redirect")}{" "}
          <PageLink route={Routes.HomePage()}>
            {t("ResetPasswordForm.link_label_homepage")}
          </PageLink>
        </Alert>
      ) : (
        <SubmitForm
          submitText={t("ResetPasswordForm.button_label_reset")}
          schema={ResetPassword}
          initialValues={{ password: "", passwordConfirmation: "", token: query.token as string }}
          onSubmit={async (values) => {
            try {
              await resetPasswordMutation(values)
              return null
            } catch (error) {
              const err = error as Error
              if (err.name === "ResetPasswordError") {
                return { [SUBMIT_FORM_ERROR]: err.message }
              }
              return { [SUBMIT_FORM_ERROR]: t("general.error_text_unknown") }
            }
          }}
        >
          <Stack spacing={2}>
            <Controller
              name="password"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextInput
                  label={t("ResetPasswordForm.input_label_new_password")}
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
                  label={t("ResetPasswordForm.input_label_confirm_password")}
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
