import { Select, Stack, Textarea, TextInput } from "@mantine/core"
import { Controller } from "react-hook-form"
import { z } from "zod"
import { UserRole } from "db"
import { SubmitForm, SubmitFormProps } from "app/core/components/common/SubmitForm"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"

export const UserForm = <S extends z.ZodType<any, any>>(props: SubmitFormProps<S>) => {
  const { t } = useSiteTranslation()

  return (
    <SubmitForm<S> {...props}>
      <Stack spacing="sm">
        <Controller
          name="username"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextInput
              label={t("UserForm.username")}
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
              label={t("UserForm.email")}
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
              label={t("UserForm.password")}
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
              label={t("UserForm.fullName")}
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
              label={t("UserForm.about")}
              minRows={2}
              value={value}
              onChange={onChange}
              error={error ? error.message : null}
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
              label={t("UserForm.role")}
              value={value}
              onChange={onChange}
              data={[
                { value: UserRole.USER, label: t("UserForm.userRole") },
                { value: UserRole.ORGANIZER, label: t("UserForm.organizerRole") },
                { value: UserRole.SUPERADMIN, label: t("UserForm.superadminRole") },
              ]}
            />
          )}
        />
      </Stack>
    </SubmitForm>
  )
}
