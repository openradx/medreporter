import { Group, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { ScriptEditorButton } from "../scriptEditor/ScriptEditorButton"

interface ScriptEditorMetaPropertyProps {
  name: string
  label: string
  modalTitle: string
  modalDescription: string
}
export const ScriptMetaProperty = ({
  name,
  label,
  modalTitle,
  modalDescription,
}: ScriptEditorMetaPropertyProps) => (
  <Controller
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <Textarea
        label={
          <Group gap="xs" align="center">
            {label}
            <ScriptEditorButton
              modalTitle={modalTitle}
              modalDescription={modalDescription}
              value={value}
              onChange={onChange}
            />
          </Group>
        }
        value={value}
        onChange={onChange}
        error={error?.message}
      />
    )}
  />
)
