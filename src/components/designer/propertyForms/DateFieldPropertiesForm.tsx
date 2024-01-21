import { TextInput } from "@mantine/core"
import { Controller } from "react-hook-form"
import { DateFieldNode, dateFieldNodeSchema } from "~/schemas/structure"
import { DisabledProperty } from "../properties/DisabledProperty"
import { FieldIdProperty } from "../properties/FieldIdProperty"
import { HiddenProperty } from "../properties/HiddenProperty"
import { InfoProperty } from "../properties/InfoProperty"
import { LabelProperty } from "../properties/LabelProperty"
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
    <LabelProperty />
    <FieldIdProperty />
    <InfoProperty />
    <DisabledProperty />
    <HiddenProperty />
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
