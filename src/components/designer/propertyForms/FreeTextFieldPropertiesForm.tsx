import { Switch, TextInput } from "@mantine/core"
import { Controller } from "react-hook-form"
import { FreeTextFieldNode, freeTextFieldNodeSchema } from "~/schemas/structure"
import { DisabledProperty } from "../properties/DisabledProperty"
import { FieldIdProperty } from "../properties/FieldIdProperty"
import { HiddenProperty } from "../properties/HiddenProperty"
import { InfoProperty } from "../properties/InfoProperty"
import { LabelProperty } from "../properties/LabelProperty"
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
    <LabelProperty />
    <FieldIdProperty />
    <InfoProperty />
    <DisabledProperty />
    <HiddenProperty />
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
