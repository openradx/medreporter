import { Stack, TextInput, Title } from "@mantine/core"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { Controller } from "react-hook-form"
import { PageLink } from "~/components/common/PageLink"
import { SubmitForm } from "~/components/common/SubmitForm"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { FormSubmitError } from "~/utils/formErrors"
import { LoginSchema } from "~/validations/auth"

export const LoginForm = () => {
  const { t } = useSiteTranslation()
  const router = useRouter()

  return (
    <Stack spacing="md">
      <Title order={3}>{t("LoginForm.formTitle")}</Title>
      <SubmitForm
        submitText={t("LoginForm.buttonLogIn")}
        schema={LoginSchema}
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values) => {
          const result = await signIn("credentials", {
            usernameOrEmail: values.usernameOrEmail,
            password: values.password,
            redirect: false,
          })

          if (!result?.ok) {
            if (result?.status === 401) {
              const message = t("LoginForm.authErrorMessage")
              throw new FormSubmitError(message)
            }
            const message = `t("formError.unexpected") ${result?.status}`
            throw new FormSubmitError(message)
          }

          const { callbackUrl } = router.query
          if (callbackUrl && typeof callbackUrl === "string") {
            router.push(callbackUrl as any)
          } else {
            router.push("/")
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
        <PageLink url={{ pathname: "/auth/forgot-password" }}>
          {t("LoginForm.linkForgotPassword")}
        </PageLink>
        <PageLink url={{ pathname: "/auth/signup" }}>{t("LoginForm.linkSignUp")}</PageLink>
      </Stack>
    </Stack>
  )
}
