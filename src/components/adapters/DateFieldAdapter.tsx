import dayjs from "dayjs"
import { evalCodeToBoolean } from "~/medtl/interpreter"
import { DateFieldEl } from "~/schemas/structure"
import { DateField } from "../fields/DateField"
import { Info } from "../template/Info"

interface DateFieldAdapterProps {
  element: DateFieldEl
}

export const DateFieldAdapter = ({ element }: DateFieldAdapterProps) => (
  <DateField
    id={element.id}
    label={element.label}
    extras={element.info && <Info>{element.info}</Info>}
    disabled={evalCodeToBoolean(element.disabled)}
    hidden={evalCodeToBoolean(element.hidden)}
    defaultValue={dayjs(element.default, element.format).toISOString()}
  />
)
