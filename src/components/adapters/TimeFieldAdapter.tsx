import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { useIsDesigning } from "~/hooks/useIsDesigning"
import { useSharedCode } from "~/hooks/useSharedCode"
import { TimeFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { TimeField } from "../fields/TimeField"
import { Info } from "../template/Info"

interface TimeFieldAdapterProps {
  node: TimeFieldNode
}

export const TimeFieldAdapter = ({ node }: TimeFieldAdapterProps) => {
  const isDesigning = useIsDesigning()
  const interpreter = useInterpreter()
  const sharedCode = useSharedCode()
  const fieldsCode = useFieldsCode()

  const disabled = useMemo(
    () => interpreter.evalCodeToBoolean(sharedCode, fieldsCode, node.disabled),
    [interpreter, sharedCode, fieldsCode, node.disabled]
  )

  const hidden = useMemo(
    () => interpreter.evalCodeToBoolean(sharedCode, fieldsCode, node.hidden),
    [interpreter, sharedCode, fieldsCode, node.hidden]
  )

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return (
    <TimeField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={disabled}
      hidden={hidden}
      withSeconds={node.withSeconds}
      defaultValue={node.default}
    />
  )
}
