import { Stack, Textarea, TextInput, Title } from "@mantine/core"
import { TRPCClientError } from "@trpc/client"
import { Controller } from "react-hook-form"
import { SubmitForm } from "~/components/common/SubmitForm"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { FormSubmitError } from "~/utils/formErrors"
import { trpc } from "~/utils/trpc"
import { SignupSchema } from "~/validations/auth"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const { t } = useSiteTranslation()
  const signup = trpc.auth.signup.useMutation()

  return (
    <Stack gap="md">
      <Title order={3}>{t("SignupForm.formTitle")}</Title>
      <SubmitForm
        submitText={t("SignupForm.buttonSubmit")}
        schema={SignupSchema}
        initialValues={{ username: "", email: "", password: "", fullName: "", about: "" }}
        onSubmit={async (values) => {
          try {
            await signup.mutateAsync(values)
            props.onSuccess?.()
          } catch (error) {
            if (error instanceof TRPCClientError) {
              if (error.message.match(/Unique constrained failed.*"username"/)) {
                throw new FormSubmitError({ username: t("SignupForm.messageUsernameAlreadyUsed") })
              }
              if (error.message.match(/Unique constrained failed.*"email"/)) {
                throw new FormSubmitError({ email: t("SignupForm.messageEmailAlreadyUsed") })
              }
            }
            if (error instanceof Error) {
              throw new FormSubmitError(t("formError.unexpected") + error.message)
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
                label={t("SignupForm.inputLabelUsername")}
                value={value}
                onChange={onChange}
                error={error ? error.message : null}
                autoComplete="off"
                required
              />
            )}
          />
          <Controller
            name="email"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                label={t("SignupForm.inputLabelEmail")}
                value={value}
                onChange={onChange}
                error={error ? error.message : null}
                autoComplete="off"
                required
              />
            )}
          />
          <Controller
            name="password"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                label={t("SignupForm.inputLabelPassword")}
                value={value}
                onChange={onChange}
                error={error ? error.message : null}
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
                label={t("SignupForm.inputLabelFullName")}
                value={value}
                onChange={onChange}
                error={error ? error.message : null}
                autoComplete="off"
                required
              />
            )}
          />
          <Controller
            name="about"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Textarea
                label={t("SignupForm.inputLabelAbout")}
                minRows={2}
                value={value}
                onChange={onChange}
                error={error ? error.message : null}
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
