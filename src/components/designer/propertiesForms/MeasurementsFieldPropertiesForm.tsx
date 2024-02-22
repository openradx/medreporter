import { z } from "zod"
import { MeasurementsFieldNode, measurementsFieldNodeSchema } from "~/schemas/structure"
import { getMeasurementsDataParams, measurementsReducer } from "~/utils/measurementsUtils"
import { DisabledProperty } from "../properties/DisabledProperty"
import { FieldIdProperty } from "../properties/FieldIdProperty"
import { FollowUpProperty } from "../properties/FollowUpProperty"
import { HiddenProperty } from "../properties/HiddenProperty"
import { InfoProperty } from "../properties/InfoProperty"
import { LabelProperty } from "../properties/LabelProperty"
import { MeasurementDimensionsProperty } from "../properties/MeasurementDimensionsProperty"
import { MeasurementRowsProperty } from "../properties/MeasurementRowsProperty"
import { PropertiesForm } from "./PropertiesForm"

interface MeasurementsFieldPropertiesFormProps {
  node: MeasurementsFieldNode
}

export const MeasurementsFieldPropertiesForm = ({ node }: MeasurementsFieldPropertiesFormProps) => {
  const { rows, dimensions, followUp } = getMeasurementsDataParams(node.default)

  return (
    <PropertiesForm
      nodeId={node.nodeId}
      schema={measurementsFieldNodeSchema.omit({ nodeId: true, type: true }).extend({
        rows: z.number(),
        dimensions: z.union([z.literal(1), z.literal(2), z.literal(3)]),
        followUp: z.boolean(),
      })}
      initialValues={{ ...node, rows, dimensions, followUp }}
      manipulator={(values) => {
        let defaultData = measurementsReducer(node.default, {
          type: "changeRows",
          rows: values.rows,
        })
        defaultData = measurementsReducer(defaultData, {
          type: "changeDimensions",
          dimensions: values.dimensions,
        })
        defaultData = measurementsReducer(defaultData, {
          type: "changeFollowUp",
          hasPrevious: values.followUp,
        })
        values.default = defaultData
        const { rows: _, dimensions: __, followUp: ___, ...rest } = values
        return rest
      }}
    >
      <LabelProperty />
      <FieldIdProperty />
      <InfoProperty />
      <DisabledProperty />
      <HiddenProperty />
      <FollowUpProperty />
      <MeasurementRowsProperty />
      <MeasurementDimensionsProperty />
    </PropertiesForm>
  )
}
