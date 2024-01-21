import { Switch, TextInput, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { TimeFieldNode, timeFieldNodeSchema } from "~/schemas/structure"
import { InfoProperty } from "../properties/InfoProperty"
import { PropertiesForm } from "./PropertiesForm"

interface TimeFieldPropertiesFormProps {
  node: TimeFieldNode
}

export const TimeFieldPropertiesForm = ({ node }: TimeFieldPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={timeFieldNodeSchema.omit({ nodeId: true, type: true })}
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
      name="withSeconds"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Switch label="With seconds" checked={value} onChange={onChange} error={error?.message} />
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
