import { Trans, useLingui } from "@lingui/react/macro"
import { Stack, TextInput, Title } from "@mantine/core"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { Controller } from "react-hook-form"
import { PageLink } from "~/components/common/PageLink"
import { SubmitForm } from "~/components/common/SubmitForm"
import { FormSubmitError } from "~/utils/formErrors"
import { LoginSchema } from "~/validations/auth"

export const LoginForm = () => {
  const { t } = useLingui()
  const router = useRouter()

  return (
    <Stack gap="md">
      <Title order={3}>
        <Trans>Login</Trans>
      </Title>
      <SubmitForm
        submitText={t`Login`}
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
              const message = t`Invalid username or password`
              throw new FormSubmitError(message)
            }
            const message = t`An error occurred: ${result?.status}`
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
        <Stack gap="sm">
          <Controller
            name="usernameOrEmail"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                label={t`Username or email`}
                value={value}
                onChange={onChange}
                error={error?.message}
              />
            )}
          />

          <Controller
            name="password"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                label={t`Password`}
                value={value}
                onChange={onChange}
                error={error?.message}
                type="password"
              />
            )}
          />
        </Stack>
      </SubmitForm>
      <Stack gap="xs">
        <PageLink url={{ pathname: "/auth/forgot-password" }}>
          <Trans>Forgot your password?</Trans>{" "}
        </PageLink>
        <PageLink url={{ pathname: "/auth/signup" }}>
          <Trans>Sign up</Trans>
        </PageLink>
      </Stack>
    </Stack>
  )
}
