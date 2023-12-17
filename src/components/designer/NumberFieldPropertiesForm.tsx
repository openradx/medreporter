import { NumberInput, TextInput } from "@mantine/core"
import { Controller } from "react-hook-form"
import { NumberFieldNode, numberFieldNodeSchema } from "~/schemas/structure"
import { PropertiesForm } from "./PropertiesForm"

interface NumberFieldPropertiesFormProps {
  node: NumberFieldNode
}

export const NumberFieldPropertiesForm = ({ node }: NumberFieldPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={numberFieldNodeSchema.omit({ nodeId: true, type: true })}
    initialValues={node}
  >
    <Controller
      name="fieldId"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextInput
          label="Field ID"
          value={value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
    <Controller
      name="label"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextInput
          label="Label"
          value={value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
    <Controller
      name="min"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <NumberInput
          label="Minimal value"
          value={value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
    <Controller
      name="max"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <NumberInput
          label="Maximal value"
          value={value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
    <Controller
      name="precision"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextInput
          label="Precision"
          value={value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
    <Controller
      name="start"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <NumberInput
          label="Start value"
          value={value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
    <Controller
      name="step"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <NumberInput
          label="Step"
          value={value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
    <Controller
      name="default"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <NumberInput
          label="Default value"
          value={value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
  </PropertiesForm>
)
