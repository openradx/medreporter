import { evalCodeToBoolean } from "~/medtl/interpreter"
import { MeasurementsFieldEl } from "~/schemas/structure"
import { MeasurementsField } from "../fields/MeasurementsField"
import { Info } from "../template/Info"

interface MeasurementsFieldAdapterProps {
  element: MeasurementsFieldEl
}

export const MeasurementsFieldAdapter = ({ element }: MeasurementsFieldAdapterProps) => (
  <MeasurementsField
    id={element.id}
    label={element.label}
    extras={element.info && <Info>{element.info}</Info>}
    disabled={evalCodeToBoolean(element.disabled)}
    hidden={evalCodeToBoolean(element.hidden)}
    defaultValue={undefined}
  />
)
