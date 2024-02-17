import { Group, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { ScriptEditorButton } from "../scriptEditor/ScriptEditorButton"

interface ScriptEditorPropertyInputProps {
  name: string
  label: string
  modalTitle: string
  modalDescription: string
}
export const ScriptPropertyInput = ({
  name,
  label,
  modalTitle,
  modalDescription,
}: ScriptEditorPropertyInputProps) => (
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
