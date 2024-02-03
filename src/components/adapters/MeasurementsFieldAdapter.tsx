import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { useSharedCode } from "~/hooks/useSharedCode"
import { MeasurementsFieldNode } from "~/schemas/structure"
import { MeasurementsField } from "../fields/MeasurementsField"
import { Info } from "../template/Info"

interface MeasurementsFieldAdapterProps {
  node: MeasurementsFieldNode
}

export const MeasurementsFieldAdapter = ({ node }: MeasurementsFieldAdapterProps) => {
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

  return (
    <MeasurementsField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={disabled}
      hidden={hidden}
      defaultValue={undefined}
    />
  )
}
