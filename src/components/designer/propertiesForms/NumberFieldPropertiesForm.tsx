import { NumberFieldNode, numberFieldNodeSchema } from "~/schemas/structure"
import { DisabledProperty } from "../properties/DisabledProperty"
import { FieldIdProperty } from "../properties/FieldIdProperty"
import { HiddenProperty } from "../properties/HiddenProperty"
import { InfoProperty } from "../properties/InfoProperty"
import { LabelProperty } from "../properties/LabelProperty"
import { MaxProperty } from "../properties/MaxProperty"
import { MinProperty } from "../properties/MinProperty"
import { NumberDefaultProperty } from "../properties/NumberDefaultProperty"
import { PrecisionProperty } from "../properties/PrecisionProperty"
import { StartProperty } from "../properties/StartProperty"
import { StepProperty } from "../properties/StepProperty"
import { WidthProperty } from "../properties/WidthProperty"
import { PropertiesForm } from "./PropertiesForm"

interface NumberFieldPropertiesFormProps {
  node: NumberFieldNode
}

export const NumberFieldPropertiesForm = ({ node }: NumberFieldPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={numberFieldNodeSchema.omit({ nodeId: true, type: true })}
    initialValues={node}
  >
    <LabelProperty />
    <FieldIdProperty />
    <InfoProperty />
    <DisabledProperty />
    <HiddenProperty />
    <WidthProperty />
    <MinProperty node={node} />
    <MaxProperty node={node} />
    <PrecisionProperty />
    <StartProperty node={node} />
    <StepProperty />
    <NumberDefaultProperty node={node} />
  </PropertiesForm>
)
