import { Group, Text, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { MarkdownEditorButton } from "../markdownEditor/MarkdownEditorButton"

export const InfoProperty = () => {
  const { t } = useSiteTranslation()

  return (
    <Controller
      name="info"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea
          label={
            <Group gap="xs" align="center">
              <Text>{t("InfoProperty.label")}</Text>
              <MarkdownEditorButton value={value} onChange={onChange} />
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
