import { Trans, useLingui } from "@lingui/react/macro"
import { Alert, Stack, TextInput, Title } from "@mantine/core"
import { Controller } from "react-hook-form"
import { SubmitForm } from "~/components/common/SubmitForm"
import { FormSubmitError } from "~/utils/formErrors"
import { trpc } from "~/utils/trpc"
import { ForgotPasswordSchema } from "~/validations/auth"

export const ForgotPasswordForm = () => {
  const { t } = useLingui()

  const forgotPassword = trpc.auth.forgotPassword.useMutation()

  return (
    <Stack gap="md">
      <Title order={3}>
        <Trans>Forgot your password?</Trans>
      </Title>
      {forgotPassword.isSuccess && (
        <Alert title={t`Request submitted`} color="green">
          <Trans>
            If that email is in our system, you will receive instructions to reset your password
            shortly.
          </Trans>
        </Alert>
      )}
      {forgotPassword.isIdle && (
        <SubmitForm
          submitText={t`If that email is in our system, you will receive instructions to reset your password shortly.`}
          schema={ForgotPasswordSchema}
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            try {
              await forgotPassword.mutateAsync(values)
            } catch (error) {
              if (error instanceof Error) {
                throw new FormSubmitError(t`An error occurred: ${error.message}`)
              }
              throw error
            }
          }}
        >
          <Controller
            name="email"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                label={t`Email`}
                value={value}
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
        </SubmitForm>
      )}
    </Stack>
  )
}
