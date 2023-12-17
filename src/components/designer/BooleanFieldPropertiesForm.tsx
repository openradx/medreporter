import { Switch, TextInput, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { BooleanFieldNode, booleanFieldNodeSchema } from "~/schemas/structure"
import { PropertiesForm } from "./PropertiesForm"

interface BooleanFieldPropertiesFormProps {
  node: BooleanFieldNode
}

export const BooleanFieldPropertiesForm = ({ node }: BooleanFieldPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={booleanFieldNodeSchema.omit({ nodeId: true, type: true })}
    initialValues={node}
  >
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
      name="info"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea
          label="Info"
          value={value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
    <Controller
      name="disabled"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea
          label="Disabled"
          value={value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
    <Controller
      name="hidden"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea
          label="Hidden"
          value={value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
    <Controller
      name="default"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Switch
          label="Default value"
          labelPosition="left"
          checked={!!value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
  </PropertiesForm>
)