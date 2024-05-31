import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { FindingFieldNode } from "~/schemas/structure"
import { FindingField } from "../fields/FindingField"
import { Info } from "../template/Info"

interface FindingNodeFieldProps {
  node: FindingFieldNode
  children?: React.ReactNode
}

export const FindingNodeField = ({ node, children }: FindingNodeFieldProps) => {
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
    <FindingField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={disabled}
      hidden={hidden}
      direction={node.direction}
      defaultValue={node.default}
    >
      {children}
    </FindingField>
  )
}
