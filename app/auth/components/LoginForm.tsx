import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Stack, TextInput, Title } from "@mantine/core"
import { AuthenticationError, PromiseReturnType } from "blitz"
import { Controller } from "react-hook-form"
import { PageLink } from "../../core/components/common/PageLink"
import { SubmitForm, SUBMIT_FORM_ERROR } from "../../core/components/common/SubmitForm"
import { useSiteTranslation } from "../../core/hooks/useSiteTranslation"
import login from "../mutations/login"
import { Login } from "../validations"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const { t } = useSiteTranslation()
  const [loginMutation] = useMutation(login)

  return (
    <Stack spacing="md">
      <Title order={3}>{t("LoginForm.title_log_in")}</Title>
      <SubmitForm
        submitText={t("LoginForm.button_label_log_in")}
        schema={Login}
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
            return null
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [SUBMIT_FORM_ERROR]: t("LoginForm.auth_error_message") }
            }
            const { message } = error as Error
            return { [SUBMIT_FORM_ERROR]: message }
          }
        }}
      >
        <Stack spacing="sm">
          <Controller
            name="usernameOrEmail"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                label={t("LoginForm.input_label_username_or_email")}
                value={value}
                onChange={onChange}
                error={error ? error.message : null}
              />
            )}
          />

          <Controller
            name="password"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                label={t("LoginForm.input_label_password")}
                value={value}
                onChange={onChange}
                error={error ? error.message : null}
                type="password"
              />
            )}
          />
        </Stack>
      </SubmitForm>
      <Stack spacing="xs">
        <PageLink route={Routes.ForgotPasswordPage()}>
          {t("LoginForm.link_label_forgot_password")}
        </PageLink>
        <PageLink route={Routes.SignupPage()}>{t("LoginForm.link_label_sign_up")}</PageLink>
      </Stack>
    </Stack>
  )
}
