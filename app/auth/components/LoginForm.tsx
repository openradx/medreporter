import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Stack, TextInput, Title } from "@mantine/core"
import { AuthenticationError, PromiseReturnType } from "blitz"
import { Controller } from "react-hook-form"
import { FormSubmitError } from "app/core/utils/formErrors"
import { PageLink } from "../../core/components/common/PageLink"
import { SubmitForm } from "../../core/components/common/SubmitForm"
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
      <Title order={3}>{t("LoginForm.formTitle")}</Title>
      <SubmitForm
        submitText={t("LoginForm.buttonLogIn")}
        schema={Login}
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
          } catch (e) {
            if (e instanceof AuthenticationError) {
              const message = t("LoginForm.authErrorMessage")
              throw new FormSubmitError(message)
            }
            if (e instanceof Error) {
              const message = t("formError.unexpected") + e.message
              throw new FormSubmitError(message)
            }
            throw e
          }
        }}
      >
        <Stack spacing="sm">
          <Controller
            name="usernameOrEmail"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                label={t("LoginForm.inputLabelUsernameOrEmail")}
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
                label={t("LoginForm.inputLabelPassword")}
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
        <PageLink route={Routes.ForgotPasswordPage()}>{t("LoginForm.linkForgotPassword")}</PageLink>
        <PageLink route={Routes.SignupPage()}>{t("LoginForm.linkSignUp")}</PageLink>
      </Stack>
    </Stack>
  )
}
