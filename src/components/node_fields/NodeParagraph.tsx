import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { Paragraph } from "../template/Paragraph"

interface NodeParagraphProps {
  link: string | null
  title: string
  hidden: string
  list: boolean
  children?: React.ReactNode
}

export const NodeParagraph = ({ link, title, hidden, list, children }: NodeParagraphProps) => {
  const interpreter = useInterpreter()
  const fieldsCode = useFieldsCode()

  const hiddenEval = useMemo(
    () => interpreter.evalCodeToBoolean(fieldsCode, hidden),
    [interpreter, fieldsCode, hidden]
  )

  return (
    <Paragraph title={title} link={link ?? undefined} hidden={hiddenEval} list={list}>
      {children}
    </Paragraph>
  )
}
