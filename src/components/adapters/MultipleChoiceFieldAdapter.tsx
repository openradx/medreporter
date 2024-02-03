import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { useIsDesigning } from "~/hooks/useIsDesigning"
import { useSharedCode } from "~/hooks/useSharedCode"
import { MultipleChoiceFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { MultipleChoiceField } from "../fields/MultipleChoiceField"
import { Figure } from "../template/Figure"
import { Info } from "../template/Info"

interface MultipleChoiceFieldAdapterProps {
  node: MultipleChoiceFieldNode
}

export const MultipleChoiceFieldAdapter = ({ node }: MultipleChoiceFieldAdapterProps) => {
  const isDesigning = useIsDesigning()
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
    <MultipleChoiceField
      id={node.fieldId}
      label={node.label}
      variant={node.variant}
      extras={extras}
      disabled={disabled}
      hidden={hidden}
      options={node.options}
      defaultValue={node.default}
    />
  )
}
