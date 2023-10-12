import { evalCodeToBoolean } from "~/medtl/interpreter"
import { NumberFieldEl } from "~/schemas/structure"
import { NumberField } from "../fields/NumberField"
import { Info } from "../template/Info"

interface NumberFieldAdapterProps {
  element: NumberFieldEl
}

export const NumberFieldAdapter = ({ element }: NumberFieldAdapterProps) => (
  <NumberField
    id={element.id}
    label={element.label}
    extras={element.info && <Info>{element.info}</Info>}
    disabled={evalCodeToBoolean(element.disabled)}
    hidden={evalCodeToBoolean(element.hidden)}
    defaultValue={element.default}
    min={element.min}
    max={element.max}
    precision={element.precision}
    start={element.start}
    step={element.step}
  />
)
