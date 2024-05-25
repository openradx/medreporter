import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { useIsDesigning } from "~/hooks/useIsDesigning"
import { MeasurementsFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { MeasurementsField } from "../fields/MeasurementsField"
import { Info } from "../template/Info"

interface MeasurementsFieldAdapterProps {
  node: MeasurementsFieldNode
}

export const MeasurementsFieldAdapter = ({ node }: MeasurementsFieldAdapterProps) => {
  const isDesigning = useIsDesigning()
  const interpreter = useInterpreter()
  const fieldsCode = useFieldsCode()

  const disabled = useMemo(
    () => interpreter.evalCodeToBoolean(fieldsCode, node.disabled),
    [interpreter, fieldsCode, node.disabled]
  )

  const hidden = useMemo(
    () => interpreter.evalCodeToBoolean(fieldsCode, node.hidden),
    [interpreter, fieldsCode, node.hidden]
  )

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return (
    <MeasurementsField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={disabled}
      hidden={hidden}
      defaultValue={node.default}
    />
  )
}
