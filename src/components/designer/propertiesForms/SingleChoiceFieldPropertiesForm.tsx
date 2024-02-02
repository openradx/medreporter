import { SingleChoiceFieldNode, singleChoiceFieldNodeSchema } from "~/schemas/structure"
import { DisabledProperty } from "../properties/DisabledProperty"
import { FieldIdProperty } from "../properties/FieldIdProperty"
import { FigureProperty } from "../properties/FigureProperty"
import { HiddenProperty } from "../properties/HiddenProperty"
import { InfoProperty } from "../properties/InfoProperty"
import { LabelProperty } from "../properties/LabelProperty"
import { OptionsProperty } from "../properties/OptionsProperty"
import { SingleChoiceDefaultProperty } from "../properties/SingleChoiceDefaultProperty"
import { SingleChoiceVariantProperty } from "../properties/SingleChoiceVariantProperty"
import { PropertiesForm } from "./PropertiesForm"

interface SingleChoiceFieldPropertiesFormProps {
  node: SingleChoiceFieldNode
}

export const SingleChoiceFieldPropertiesForm = ({ node }: SingleChoiceFieldPropertiesFormProps) => (
  <PropertiesForm
    nodeId={node.nodeId}
    schema={singleChoiceFieldNodeSchema.omit({ nodeId: true, type: true })}
    initialValues={node}
  >
    <LabelProperty />
    <FieldIdProperty />
    <InfoProperty />
    <DisabledProperty />
    <HiddenProperty />
    <SingleChoiceVariantProperty />
    <FigureProperty />
    <OptionsProperty node={node} />
    <SingleChoiceDefaultProperty node={node} />
  </PropertiesForm>
)
