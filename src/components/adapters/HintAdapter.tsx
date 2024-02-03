import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { useIsDesigning } from "~/hooks/useIsDesigning"
import { useSharedCode } from "~/hooks/useSharedCode"
import { HintNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { Hint } from "../template/Hint"

interface HintAdapterProps {
  node: HintNode
}

export const HintAdapter = ({ node }: HintAdapterProps) => {
  const isDesigning = useIsDesigning()
  const interpreter = useInterpreter()
  const sharedCode = useSharedCode()
  const fieldsCode = useFieldsCode()

  const hidden = useMemo(
    () => interpreter.evalCodeToBoolean(sharedCode, fieldsCode, node.hidden),
    [interpreter, sharedCode, fieldsCode, node.hidden]
  )

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return <Hint level={node.level} hidden={hidden} content={node.content} />
}
