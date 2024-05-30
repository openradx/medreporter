import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { SingleChoiceFieldNode } from "~/schemas/structure"
import { SingleChoiceField } from "../fields/SingleChoiceField"
import { Figure } from "../template/Figure"
import { Info } from "../template/Info"

interface SingleChoiceNodeFieldProps {
  node: SingleChoiceFieldNode
}

export const SingleChoiceNodeField = ({ node }: SingleChoiceNodeFieldProps) => {
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

  const extras = (
    <>
      {node.info?.trim() && <Info>{node.info}</Info>}
      {node.figure?.trim() && <Figure>{node.figure}</Figure>}
    </>
  )

  return (
    <SingleChoiceField
      id={node.fieldId}
      label={node.label}
      variant={node.variant}
      extras={extras}
      disabled={disabled}
      hidden={hidden}
      width={node.width}
      options={node.options}
      defaultValue={node.default}
    />
  )
}
