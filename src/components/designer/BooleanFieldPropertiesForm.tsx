import { Switch, TextInput } from "@mantine/core"
import { Controller } from "react-hook-form"
import { BooleanFieldNode, booleanFieldNodeSchema } from "~/schemas/structure"
import { PropertyForm } from "./PropertiesForm"

interface BooleanFieldPropertiesFormProps {
  node: BooleanFieldNode
}

export const BooleanFieldPropertiesForm = ({ node }: BooleanFieldPropertiesFormProps) => (
  <PropertyForm
    nodeId={node.nodeId}
    schema={booleanFieldNodeSchema.omit({ nodeId: true, type: true })}
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
      name="default"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Switch
          label="Default Value"
          labelPosition="left"
          checked={!!value}
          onChange={onChange}
          error={error ? error.message : null}
        />
      )}
    />
  </PropertyForm>
)
