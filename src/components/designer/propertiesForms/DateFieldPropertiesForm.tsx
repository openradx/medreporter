import { DateFieldNode, dateFieldNodeSchema } from "~/schemas/structure"
import { DateDefaultProperty } from "../properties/DateDefaultProperty"
import { DisabledProperty } from "../properties/DisabledProperty"
import { FieldIdProperty } from "../properties/FieldIdProperty"
import { FormatProperty } from "../properties/FormatProperty"
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
    <FormatProperty />
    <DateDefaultProperty node={node} />
  </PropertiesForm>
)
