import { MultipleChoiceFieldNode, multipleChoiceFieldNodeSchema } from "~/schemas/structure"
import { DisabledProperty } from "../properties/DisabledProperty"
import { FieldIdProperty } from "../properties/FieldIdProperty"
import { FigureProperty } from "../properties/FigureProperty"
import { HiddenProperty } from "../properties/HiddenProperty"
import { InfoProperty } from "../properties/InfoProperty"
import { LabelProperty } from "../properties/LabelProperty"
import { MultipleChoiceDefaultProperty } from "../properties/MultipleChoiceDefaultProperty"
import { MultipleChoiceVariantProperty } from "../properties/MultipleChoiceVariantProperty"
import { OptionsProperty } from "../properties/OptionsProperty"
import { WidthProperty } from "../properties/WidthProperty"
import { PropertiesForm } from "./PropertiesForm"

interface MultipleChoiceFieldPropertiesFormProps {
  node: MultipleChoiceFieldNode
}

export const MultipleChoiceFieldPropertiesForm = ({
  node,
}: MultipleChoiceFieldPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={multipleChoiceFieldNodeSchema.omit({ nodeId: true, type: true })}
    initialValues={node}
  >
    <LabelProperty />
    <FieldIdProperty />
    <InfoProperty />
    <DisabledProperty />
    <HiddenProperty />
    <WidthProperty />
    <MultipleChoiceVariantProperty />
    <FigureProperty />
    <OptionsProperty node={node} />
    <MultipleChoiceDefaultProperty node={node} />
  </PropertiesForm>
)
