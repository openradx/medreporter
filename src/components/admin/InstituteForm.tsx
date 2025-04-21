import { useLingui } from "@lingui/react/macro"
import { TextInput } from "@mantine/core"
import { Controller } from "react-hook-form"
import { z } from "zod"
import { SubmitForm, SubmitFormProps } from "~/components/common/SubmitForm"

export const InstituteForm = <S extends z.ZodType<any, any>>(props: SubmitFormProps<S>) => {
  const { t } = useLingui()

  return (
    <SubmitForm<S> {...props}>
      <Controller
        name="name"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextInput
            label={t`Institute name`}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />
    </SubmitForm>
  )
}
