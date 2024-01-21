import { ActionIcon, Group, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { MdCode as CodeIcon } from "react-icons/md"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const HiddenProperty = () => {
  const { t } = useSiteTranslation()

  return (
    <Controller
      name="hidden"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea
          label={
            <Group gap="xs" align="center">
              {t("HiddenProperty.label")}
              <ActionIcon color="red" size="sm" variant="subtle">
                <CodeIcon size={20} />
              </ActionIcon>
            </Group>
          }
          value={value}
          onChange={onChange}
          error={error?.message}
        />
      )}
    />
  )
}
