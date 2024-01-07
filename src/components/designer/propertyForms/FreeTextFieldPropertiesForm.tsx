import { Switch, TextInput, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { FreeTextFieldNode, freeTextFieldNodeSchema } from "~/schemas/structure"
import { PropertiesForm } from "./PropertiesForm"

interface FreeTextFieldPropertiesFormProps {
  node: FreeTextFieldNode
}

export const FreeTextFieldPropertiesForm = ({ node }: FreeTextFieldPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={freeTextFieldNodeSchema.omit({ nodeId: true, type: true })}
    initialValues={node}
  >
    <Controller
      name="label"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextInput label="Label" value={value} onChange={onChange} error={error?.message} />
      )}
    />
    <Controller
      name="fieldId"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextInput label="Field ID" value={value} onChange={onChange} error={error?.message} />
      )}
    />
    <Controller
      name="info"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea label="Info" value={value} onChange={onChange} error={error?.message} />
      )}
    />
    <Controller
      name="disabled"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea label="Disabled" value={value} onChange={onChange} error={error?.message} />
      )}
    />
    <Controller
      name="hidden"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Textarea label="Hidden" value={value} onChange={onChange} error={error?.message} />
      )}
    />
    <Controller
      name="multiline"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Switch
          label="Multiline"
          labelPosition="left"
          checked={!!value}
          onChange={onChange}
          error={error?.message}
        />
      )}
    />
    <Controller
      name="default"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextInput label="Default value" value={value} onChange={onChange} error={error?.message} />
      )}
    />
  </PropertiesForm>
)
