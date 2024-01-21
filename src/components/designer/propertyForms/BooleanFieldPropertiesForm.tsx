import { Switch } from "@mantine/core"
import { Controller } from "react-hook-form"
import { BooleanFieldNode, booleanFieldNodeSchema } from "~/schemas/structure"
import { DisabledProperty } from "../properties/DisabledProperty"
import { FieldIdProperty } from "../properties/FieldIdProperty"
import { HiddenProperty } from "../properties/HiddenProperty"
import { InfoProperty } from "../properties/InfoProperty"
import { LabelProperty } from "../properties/LabelProperty"
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
    <LabelProperty />
    <FieldIdProperty />
    <InfoProperty />
    <DisabledProperty />
    <HiddenProperty />
    <Controller
      name="default"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Switch
          label="Default value"
          labelPosition="left"
          checked={!!value}
          onChange={onChange}
          error={error?.message}
        />
      )}
    />
  </PropertiesForm>
)
