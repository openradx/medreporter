import { FreeTextFieldNode, freeTextFieldNodeSchema } from "~/schemas/structure"
import { DisabledProperty } from "../properties/DisabledProperty"
import { FieldIdProperty } from "../properties/FieldIdProperty"
import { FreeTextDefaultProperty } from "../properties/FreeTextDefaultProperty"
import { HiddenProperty } from "../properties/HiddenProperty"
import { InfoProperty } from "../properties/InfoProperty"
import { LabelProperty } from "../properties/LabelProperty"
import { MultilineProperty } from "../properties/MultilineProperty"
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
    <FreeTextDefaultProperty />
  </PropertiesForm>
)
