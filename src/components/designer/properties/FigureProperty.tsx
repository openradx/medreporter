import { Group, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { SvgEditorButton } from "../svgEditor/SvgEditorButton"

export const FigureProperty = () => {
  const { t } = useSiteTranslation()
  return (
    <Controller
      name="figure"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea
          label={
            <Group gap="xs" align="center">
              {t("FigureProperty.label")}
              <SvgEditorButton value={value} onChange={onChange} />
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
