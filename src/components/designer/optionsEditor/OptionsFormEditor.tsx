import { Button, Group, Stack } from "@mantine/core"
import { useFieldArray, useFormContext } from "react-hook-form"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { Option } from "~/schemas/structure"
import { OptionsTable } from "./OptionsTable"

export const OptionsFormEditor = () => {
  const { t } = useSiteTranslation()

  const { control, getValues } = useFormContext<{ options: Option[] }>()

  const { fields, append, remove, move } = useFieldArray<{ options: Option[] }, "options">({
    name: "options",
  })

  const appendOption = () => {
    const num = getValues("options").length + 1
    return append({ label: `Option ${num}`, value: `option-${num}` })
  }

  return (
    <form>
      <Stack>
        <OptionsTable control={control} fields={fields} move={move} remove={remove} />
        <Group justify="center">
          <Button variant="outline" type="button" onClick={appendOption}>
            {t("OptionsFormEditor.addOptionLabel")}
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
