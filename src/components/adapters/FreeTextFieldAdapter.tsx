import { evalCodeToBoolean } from "~/medtl/interpreter"
import { FreeTextFieldEl } from "~/schemas/structure"
import { FreeTextField } from "../fields/FreeTextField"
import { Info } from "../template/Info"

interface FreeTextFieldAdapterProps {
  element: FreeTextFieldEl
}

export const FreeTextFieldAdapter = ({ element }: FreeTextFieldAdapterProps) => (
  <FreeTextField
    id={element.id}
    label={element.label}
    extras={element.info && <Info>{element.info}</Info>}
    disabled={evalCodeToBoolean(element.disabled)}
    hidden={evalCodeToBoolean(element.hidden)}
    defaultValue={element.default}
    multiline={element.multiline}
  />
)
