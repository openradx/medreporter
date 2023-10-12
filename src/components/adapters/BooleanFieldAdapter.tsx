import { evalCodeToBoolean } from "~/medtl/interpreter"
import { BooleanFieldEl } from "~/schemas/structure"
import { BooleanField } from "../fields/BooleanField"
import { Info } from "../template/Info"

interface BooleanFieldAdapterProps {
  element: BooleanFieldEl
}

export const BooleanFieldAdapter = ({ element }: BooleanFieldAdapterProps) => (
  <BooleanField
    id={element.id}
    label={element.label}
    extras={element.info && <Info>{element.info}</Info>}
    disabled={evalCodeToBoolean(element.disabled)}
    hidden={evalCodeToBoolean(element.hidden)}
    defaultValue={element.default}
  />
)
