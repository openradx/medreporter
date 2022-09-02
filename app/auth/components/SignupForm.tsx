import { useMutation } from "@blitzjs/rpc"
import { Stack, Textarea, TextInput, Title } from "@mantine/core"
import { Controller } from "react-hook-form"
import { SubmitForm, SUBMIT_FORM_ERROR } from "../../core/components/common/SubmitForm"
import { useSiteTranslation } from "../../core/hooks/useSiteTranslation"
import { uniqueConstraintFailed } from "../../core/utils/mutationUtils"
import signup from "../mutations/signup"
import { Signup } from "../validations"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const { t } = useSiteTranslation()
  const [signupMutation] = useMutation(signup)

  return (
    <Stack spacing="md">
      <Title order={3}>{t("SignupForm.formTitle")}</Title>
      <SubmitForm
        submitText={t("SignupForm.buttonSubmit")}
        schema={Signup}
        initialValues={{ username: "", email: "", password: "", fullName: "", about: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
            return null
          } catch (error) {
            if (uniqueConstraintFailed(error, "email")) {
              return { email: t("SignupForm.messageEmail_used") }
            }
            const { message } = error as Error
            return { [SUBMIT_FORM_ERROR]: message }
          }
        }}
      >
        <Stack spacing="sm">
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
