import { Trans, useLingui } from "@lingui/react/macro"
import { Stack, Textarea, TextInput, Title } from "@mantine/core"
import { TRPCClientError } from "@trpc/client"
import { Controller } from "react-hook-form"
import { SubmitForm } from "~/components/common/SubmitForm"
import { FormSubmitError } from "~/utils/formErrors"
import { trpc } from "~/utils/trpc"
import { SignupSchema } from "~/validations/auth"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const { t } = useLingui()
  const signup = trpc.auth.signup.useMutation()

  return (
    <Stack gap="md">
      <Title order={3}>
        <Trans>Create an account</Trans>
      </Title>
      <SubmitForm
        submitText={t`Create account`}
        schema={SignupSchema}
        initialValues={{ username: "", email: "", password: "", fullName: "", about: "" }}
        onSubmit={async (values) => {
          try {
            await signup.mutateAsync(values)
            props.onSuccess?.()
          } catch (error) {
            if (error instanceof TRPCClientError) {
              if (error.message === "This username is reserved. Please pick another.") {
                throw new FormSubmitError({
                  username: t`This username is reserved. Please pick another one.`,
                })
              }
              if (error.message.match(/Unique constrained failed.*"username"/)) {
                throw new FormSubmitError({ username: t`This username is already being used.` })
              }
              if (error.message.match(/Unique constrained failed.*"email"/)) {
                throw new FormSubmitError({ email: t`This email is already being used.` })
              }
            }
            if (error instanceof Error) {
              throw new FormSubmitError(t`An error occurred: ${error.message}`)
            }
            throw error
          }
        }}
      >
        <Stack gap="sm">
          <Controller
            name="username"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                label={t`Username`}
                value={value}
                onChange={onChange}
                error={error?.message}
                autoComplete="off"
                required
              />
            )}
          />
          <Controller
            name="email"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                label={t`Email`}
                value={value}
                onChange={onChange}
                error={error?.message}
                autoComplete="off"
                required
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
                autoComplete="off"
                required
              />
            )}
          />
          <Controller
            name="fullName"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                label={t`Full name`}
                value={value}
                onChange={onChange}
                error={error?.message}
                autoComplete="off"
                required
              />
            )}
          />
          <Controller
            name="about"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Textarea
                label={t`About yourself`}
                minRows={2}
                value={value}
                onChange={onChange}
                error={error?.message}
                autoComplete="off"
                autosize
              />
            )}
          />
        </Stack>
      </SubmitForm>
    </Stack>
  )
}
