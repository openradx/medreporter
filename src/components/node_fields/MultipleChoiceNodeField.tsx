import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { MultipleChoiceFieldNode } from "~/schemas/structure"
import { MultipleChoiceField } from "../fields/MultipleChoiceField"
import { Figure } from "../template/Figure"
import { Info } from "../template/Info"

interface MultipleChoiceNodeFieldProps {
  node: MultipleChoiceFieldNode
}

export const MultipleChoiceNodeField = ({ node }: MultipleChoiceNodeFieldProps) => {
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
    <MultipleChoiceField
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
