import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { FreeTextFieldNode } from "~/schemas/structure"
import { FreeTextField } from "../fields/FreeTextField"
import { Info } from "../template/Info"

interface FreeTextNodeFieldProps {
  node: FreeTextFieldNode
}

export const FreeTextNodeField = ({ node }: FreeTextNodeFieldProps) => {
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
    <FreeTextField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={disabled}
      hidden={hidden}
      width={node.width}
      defaultValue={node.default}
      multiline={node.multiline}
      grow={node.grow}
      rows={node.rows}
      minRows={node.minRows}
      maxRows={node.maxRows}
    />
  )
}
