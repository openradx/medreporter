import dayjs from "dayjs"
import { useIsDesigning } from "~/hooks/useIsDesigning"
import { evalCodeToBoolean } from "~/medtl/interpreter"
import { DateFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { DateField } from "../fields/DateField"
import { Info } from "../template/Info"

interface DateFieldAdapterProps {
  node: DateFieldNode
}

export const DateFieldAdapter = ({ node }: DateFieldAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return (
    <DateField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={evalCodeToBoolean(node.disabled)}
      hidden={evalCodeToBoolean(node.hidden)}
      format={node.format}
      defaultValue={node.default ? dayjs(node.default).toISOString() : undefined}
    />
  )
}
