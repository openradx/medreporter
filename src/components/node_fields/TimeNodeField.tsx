import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { TimeFieldNode } from "~/schemas/structure"
import { TimeField } from "../fields/TimeField"
import { Info } from "../template/Info"

interface TimeNodeFieldProps {
  node: TimeFieldNode
}

export const TimeNodeField = ({ node }: TimeNodeFieldProps) => {
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
    <TimeField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={disabled}
      hidden={hidden}
      width={node.width}
      withSeconds={node.withSeconds}
      defaultValue={node.default}
    />
  )
}
