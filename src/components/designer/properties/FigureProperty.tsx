import { Trans } from "@lingui/react/macro"
import { Group, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { SvgEditorButton } from "../svgEditor/SvgEditorButton"

export const FigureProperty = () => {
  return (
    <Controller
      name="figure"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea
          label={
            <Group gap="xs" align="center">
              <Trans>Figure</Trans>
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
