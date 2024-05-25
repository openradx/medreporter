import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { useIsDesigning } from "~/hooks/useIsDesigning"
import { NumberFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { NumberField } from "../fields/NumberField"
import { Info } from "../template/Info"

interface NumberFieldAdapterProps {
  node: NumberFieldNode
}

export const NumberFieldAdapter = ({ node }: NumberFieldAdapterProps) => {
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
    <NumberField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={disabled}
      hidden={hidden}
      width={node.width}
      defaultValue={node.default}
      min={node.min ?? undefined}
      max={node.max ?? undefined}
      precision={node.precision}
      start={node.start}
      step={node.step}
    />
  )
}
