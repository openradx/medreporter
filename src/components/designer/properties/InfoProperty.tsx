import { Trans } from "@lingui/react/macro"
import { Group, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { MarkdownEditorButton } from "../markdownEditor/MarkdownEditorButton"

export const InfoProperty = () => (
  <Controller
    name="info"
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <Textarea
        label={
          <Group gap="xs" align="center">
            <Trans>Info</Trans>
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
