import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { NumberFieldNode } from "~/schemas/structure"
import { NumberField } from "../fields/NumberField"
import { Info } from "../template/Info"

interface NumberNodeFieldProps {
  node: NumberFieldNode
}

export const NumberNodeField = ({ node }: NumberNodeFieldProps) => {
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
