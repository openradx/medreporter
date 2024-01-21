import { TextInput, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { DateFieldNode, dateFieldNodeSchema } from "~/schemas/structure"
import { InfoProperty } from "../properties/InfoProperty"
import { PropertiesForm } from "./PropertiesForm"

interface DateFieldPropertiesFormProps {
  node: DateFieldNode
}

export const DateFieldPropertiesForm = ({ node }: DateFieldPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={dateFieldNodeSchema.omit({ nodeId: true, type: true })}
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
    <InfoProperty />
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
      name="format"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextInput label="Format" value={value} onChange={onChange} error={error?.message} />
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
