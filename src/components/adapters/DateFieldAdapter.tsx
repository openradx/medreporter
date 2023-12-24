import dayjs from "dayjs"
import { evalCodeToBoolean } from "~/medtl/interpreter"
import { DateFieldNode } from "~/schemas/structure"
import { DateField } from "../fields/DateField"
import { Info } from "../template/Info"

interface DateFieldAdapterProps {
  node: DateFieldNode
}

export const DateFieldAdapter = ({ node }: DateFieldAdapterProps) => (
  <DateField
    id={node.fieldId}
    label={node.label}
    extras={node.info && <Info>{node.info}</Info>}
    disabled={evalCodeToBoolean(node.disabled)}
    hidden={evalCodeToBoolean(node.hidden)}
    defaultValue={dayjs(node.default, node.format).toISOString()}
  />
)
