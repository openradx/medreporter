import { FreeTextFieldNode, freeTextFieldNodeSchema } from "~/schemas/structure"
import { DisabledProperty } from "../properties/DisabledProperty"
import { FieldIdProperty } from "../properties/FieldIdProperty"
import { FreeTextDefaultProperty } from "../properties/FreeTextDefaultProperty"
import { GrowProperty } from "../properties/GrowProperty"
import { HiddenProperty } from "../properties/HiddenProperty"
import { InfoProperty } from "../properties/InfoProperty"
import { LabelProperty } from "../properties/LabelProperty"
import { MaxRowsProperty } from "../properties/MaxRowsProperty"
import { MinRowsProperty } from "../properties/MinRowsProperty"
import { MultilineProperty } from "../properties/MultilineProperty"
import { RowsProperty } from "../properties/RowsProperty"
import { WidthProperty } from "../properties/WidthProperty"
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
    <WidthProperty />
    <MultilineProperty />
    {node.multiline && <GrowProperty />}
    {node.multiline && !node.grow && <RowsProperty />}
    {node.multiline && node.grow && <MinRowsProperty />}
    {node.multiline && node.grow && <MaxRowsProperty />}
    <FreeTextDefaultProperty />
  </PropertiesForm>
)
