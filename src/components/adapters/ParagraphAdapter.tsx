import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { useIsDesigning } from "~/hooks/useIsDesigning"
import { useSharedCode } from "~/hooks/useSharedCode"
import { ParagraphNode } from "~/schemas/report"
import { DraggableCanvasContainer } from "../designer/DraggableCanvasContainer"
import { Paragraph } from "../template/Paragraph"
import { StatementAdapter } from "./StatementAdapter"

interface ParagraphAdapterProps {
  node: ParagraphNode
}

export const ParagraphAdapter = ({ node }: ParagraphAdapterProps) => {
  const isDesigning = useIsDesigning()
  const interpreter = useInterpreter()
  const sharedCode = useSharedCode()
  const fieldsCode = useFieldsCode()

  const hidden = useMemo(
    () => interpreter.evalCodeToBoolean(sharedCode, fieldsCode, node.hidden),
    [interpreter, sharedCode, fieldsCode, node.hidden]
  )

  const children = node.children.map((child) => (
    <StatementAdapter key={child.nodeId} node={child} />
  ))

  if (isDesigning) {
    return <DraggableCanvasContainer node={node}>{children}</DraggableCanvasContainer>
  }

  return (
    <Paragraph title={node.title} link={node.link ?? undefined} hidden={hidden} list={node.list}>
      {children}
    </Paragraph>
  )
}
