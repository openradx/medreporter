import { Group, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { ScriptEditorButton } from "../scriptEditor/ScriptEditorButton"

interface ScriptEditorMetaPropertyProps {
  name: string
  label: string
}
export const ScriptEditorMetaProperty = ({ name, label }: ScriptEditorMetaPropertyProps) => (
  <Controller
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <Textarea
        label={
          <Group gap="xs" align="center">
            {label}
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
