import { TextInput } from "@mantine/core"
import { Control, Controller } from "react-hook-form"
import { z } from "zod"
import { SubmitForm, SubmitFormProps } from "~/components/common/SubmitForm"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const InstituteForm = <S extends z.ZodType<{ name: string }>>(props: SubmitFormProps<S>) => {
  const { t } = useSiteTranslation()

  return (
    <SubmitForm<S> {...props}>
      {(control) => (
        <Controller
          control={control as Control<{ name: string }>} //TODO: not nice
          name="name"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextInput
              label={t("InstituteForm.inputLabelName")}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      )}
    </SubmitForm>
  )
}
