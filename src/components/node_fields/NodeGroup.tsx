import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { GroupNode } from "~/schemas/structure"
import { Group } from "../template/Group"
import { Info } from "../template/Info"

interface NodeGroupProps {
  node: GroupNode
  children: React.ReactNode
}

export const NodeGroup = ({ node, children }: NodeGroupProps) => {
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

  return (
    <Group
      _id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={disabled}
      hidden={hidden}
      direction={node.direction}
      border={node.border}
    >
      {children}
    </Group>
  )
}
