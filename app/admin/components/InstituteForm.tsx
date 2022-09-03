import { TextInput } from "@mantine/core"
import { Controller } from "react-hook-form"
import { z } from "zod"
import { SubmitForm, SubmitFormProps } from "app/core/components/common/SubmitForm"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"

export const InstituteForm = <S extends z.ZodType<any, any>>(props: SubmitFormProps<S>) => {
  const { t } = useSiteTranslation()

  return (
    <SubmitForm<S> {...props}>
      <Controller
        name="name"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextInput
            label={t("InstituteForm.inputLabelName")}
            value={value}
            onChange={onChange}
            error={error ? error.message : null}
          />
        )}
      />
    </SubmitForm>
  )
}
