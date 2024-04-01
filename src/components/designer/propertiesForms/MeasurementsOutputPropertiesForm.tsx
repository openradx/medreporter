import { MeasurementsOutputNode, measurementsOutputNodeSchema } from "~/schemas/report"
import { useAppSelector } from "~/state/store"
import { selectTemplate } from "~/state/templateSlice"
import { isMeasurementsField } from "~/utils/designerUtils"
import { CurrentLabelProperty } from "../properties/CurrentLabelProperty"
import { LabelProperty } from "../properties/LabelProperty"
import { LegendProperty } from "../properties/LegendProperty"
import { LinkProperty } from "../properties/LinkProperty"
import { LinkedMeasurementsFieldProperty } from "../properties/LinkedMeasurementsFieldProperty"
import { LocationLabelProperty } from "../properties/LocationLabel"
import { PreviousLabelProperty } from "../properties/PreviousLabelProperty"
import { ReferenceLabelProperty } from "../properties/ReferenceLabelProperty"
import { PropertiesForm } from "./PropertiesForm"

interface MeasurementsOutputPropertiesFormProps {
  node: MeasurementsOutputNode
}

export const MeasurementsOutputPropertiesForm = ({
  node,
}: MeasurementsOutputPropertiesFormProps) => {
  const template = useAppSelector(selectTemplate)
  const linkedMeasurementsFieldSchema =
    measurementsOutputNodeSchema.shape.linkedMeasurementsField.refine(
      (linkedMeasurementsField) =>
        isMeasurementsField(template, linkedMeasurementsField) || linkedMeasurementsField === "",
      { message: "Invalid linked measurements field" }
    )

  return (
    <PropertiesForm
      nodeId={node.nodeId}
      schema={measurementsOutputNodeSchema
        .omit({ nodeId: true, type: true })
        .extend({ linkedMeasurementsField: linkedMeasurementsFieldSchema })}
      initialValues={node}
    >
      <LabelProperty />
      <LinkedMeasurementsFieldProperty />
      <LinkProperty />
      <LegendProperty />
      <CurrentLabelProperty />
      <PreviousLabelProperty />
      <LocationLabelProperty />
      <ReferenceLabelProperty />
    </PropertiesForm>
  )
}
