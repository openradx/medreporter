import { Switch, TextInput } from "@mantine/core"
import { Controller } from "react-hook-form"
import { TimeFieldNode, timeFieldNodeSchema } from "~/schemas/structure"
import { DisabledProperty } from "../properties/DisabledProperty"
import { FieldIdProperty } from "../properties/FieldIdProperty"
import { HiddenProperty } from "../properties/HiddenProperty"
import { InfoProperty } from "../properties/InfoProperty"
import { LabelProperty } from "../properties/LabelProperty"
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
    <LabelProperty />
    <FieldIdProperty />
    <InfoProperty />
    <DisabledProperty />
    <HiddenProperty />
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
