import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { MeasurementsFieldNode } from "~/schemas/structure"
import { MeasurementsField } from "../fields/MeasurementsField"
import { Info } from "../template/Info"

interface MeasurementsNodeFieldProps {
  node: MeasurementsFieldNode
}

export const MeasurementsNodeField = ({ node }: MeasurementsNodeFieldProps) => {
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
