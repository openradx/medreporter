import { Group, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { ScriptEditorButton } from "../scriptEditor/ScriptEditorButton"

export const DisabledProperty = () => {
  const { t } = useSiteTranslation()

  return (
    <Controller
      name="disabled"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea
          label={
            <Group gap="xs" align="center">
              {t("DisabledProperty.label")}
              <ScriptEditorButton />
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
