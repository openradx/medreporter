import { Select, Stack, Textarea, TextInput } from "@mantine/core"
import { UserRole } from "@prisma/client"
import { Controller } from "react-hook-form"
import { z } from "zod"
import { SubmitForm, SubmitFormProps } from "~/components/common/SubmitForm"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const UserForm = <S extends z.ZodType<any, any>>(props: SubmitFormProps<S>) => {
  const { t } = useSiteTranslation()

  return (
    <SubmitForm<S> {...props}>
      <Stack gap="sm">
        <Controller
          name="username"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextInput
              label={t("UserForm.inputLabelUsername")}
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
              label={t("UserForm.inputLabelEmail")}
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
              label={t("UserForm.inputLabelPassword")}
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
              label={t("UserForm.inputLabelFullName")}
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
              label={t("UserForm.inputLabelAbout")}
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
              label={t("UserForm.inputLabelRole")}
              value={value}
              onChange={onChange}
              data={[
                { value: UserRole.USER, label: t("UserForm.optionUserRole") },
                { value: UserRole.ORGANIZER, label: t("UserForm.optionOrganizerRole") },
                { value: UserRole.SUPERADMIN, label: t("UserForm.optionSuperadminRole") },
              ]}
            />
          )}
        />
      </Stack>
    </SubmitForm>
  )
}
