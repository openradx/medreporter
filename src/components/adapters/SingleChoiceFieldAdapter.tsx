import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { useIsDesigning } from "~/hooks/useIsDesigning"
import { SingleChoiceFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { SingleChoiceField } from "../fields/SingleChoiceField"
import { Figure } from "../template/Figure"
import { Info } from "../template/Info"

interface SingleChoiceFieldAdapterProps {
  node: SingleChoiceFieldNode
}

export const SingleChoiceFieldAdapter = ({ node }: SingleChoiceFieldAdapterProps) => {
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
