import { evalCodeToBoolean } from "~/medtl/interpreter"
import { TimeFieldEl } from "~/schemas/structure"
import { TimeField } from "../fields/TimeField"
import { Info } from "../template/Info"

interface TimeFieldAdapterProps {
  element: TimeFieldEl
}

export const TimeFieldAdapter = ({ element }: TimeFieldAdapterProps) => (
  <TimeField
    id={element.id}
    label={element.label}
    extras={element.info && <Info>{element.info}</Info>}
    disabled={evalCodeToBoolean(element.disabled)}
    hidden={evalCodeToBoolean(element.hidden)}
    withSeconds={element.withSeconds}
    defaultValue={element.default}
  />
)
