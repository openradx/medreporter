import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { ParagraphNode } from "~/schemas/report"
import { Paragraph } from "../template/Paragraph"

interface ParagraphInstanceProps {
  node: ParagraphNode
  children?: React.ReactNode
}

export const ParagraphInstance = ({ node, children }: ParagraphInstanceProps) => {
  const interpreter = useInterpreter()
  const fieldsCode = useFieldsCode()

  const hidden = useMemo(
    () => interpreter.evalCodeToBoolean(fieldsCode, node.hidden),
    [interpreter, fieldsCode, node.hidden]
  )

  return (
    <Paragraph title={node.title} link={node.link ?? undefined} hidden={hidden} list={node.list}>
      {children}
    </Paragraph>
  )
}
