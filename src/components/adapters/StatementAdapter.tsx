import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { useIsDesigning } from "~/hooks/useIsDesigning"
import { useSharedCode } from "~/hooks/useSharedCode"
import { StatementNode } from "~/schemas/report"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { Statement } from "../template/Statement"

interface StatementAdapterProps {
  node: StatementNode
}

export const StatementAdapter = ({ node }: StatementAdapterProps) => {
  const isDesigning = useIsDesigning()
  const interpreter = useInterpreter()
  const sharedCode = useSharedCode()
  const fieldsCode = useFieldsCode()

  const hidden = useMemo(
    () => interpreter.evalCodeToBoolean(sharedCode, fieldsCode, node.hidden),
    [interpreter, sharedCode, fieldsCode, node.hidden]
  )

  const content = useMemo(
    () => interpreter.evalCodeToString(sharedCode, fieldsCode, node.content),
    [interpreter, sharedCode, fieldsCode, node.content]
  )

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return <Statement link={node.link ?? undefined} hidden={hidden} content={content} />
}
