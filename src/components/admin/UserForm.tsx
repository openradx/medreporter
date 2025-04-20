import { useLingui } from "@lingui/react/macro"
import { Select, Stack, Textarea, TextInput } from "@mantine/core"
import { UserRole } from "@prisma/client"
import { Controller } from "react-hook-form"
import { z } from "zod"
import { SubmitForm, SubmitFormProps } from "~/components/common/SubmitForm"

export const UserForm = <S extends z.ZodType<any, any>>(props: SubmitFormProps<S>) => {
  const { t } = useLingui()

  return (
    <SubmitForm<S> {...props}>
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
        <Controller
          name="role"
          render={({ field: { value, onChange } }) => (
            <Select
              id="user-form-role"
              label={t`Role`}
              value={value}
              onChange={onChange}
              data={[
                { value: UserRole.USER, label: t`User` },
                { value: UserRole.ORGANIZER, label: t`Organizer` },
                { value: UserRole.SUPERUSER, label: t`Superuser` },
              ]}
            />
          )}
        />
      </Stack>
    </SubmitForm>
  )
}
