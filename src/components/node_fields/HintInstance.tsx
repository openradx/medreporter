import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { HintNode } from "~/schemas/structure"
import { Hint } from "../template/Hint"

interface HintInstanceProps {
  node: HintNode
}

export const HintInstance = ({ node }: HintInstanceProps) => {
  const interpreter = useInterpreter()
  const fieldsCode = useFieldsCode()

  const hidden = useMemo(
    () => interpreter.evalCodeToBoolean(fieldsCode, node.hidden),
    [interpreter, fieldsCode, node.hidden]
  )

  return <Hint level={node.level} hidden={hidden} content={node.content} />
}
