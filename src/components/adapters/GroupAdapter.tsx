import { useMemo } from "react"
import { useInterpreter } from "~/contexts/InterpreterContext"
import { useFieldsCode } from "~/hooks/useFieldsCode"
import { useIsDesigning } from "~/hooks/useIsDesigning"
import { GroupNode } from "~/schemas/structure"
import { DraggableCanvasContainer } from "../designer/DraggableCanvasContainer"
import { Group } from "../template/Group"
import { Info } from "../template/Info"
import { DiscreteFieldAdapter } from "./DiscreteFieldAdapter"
import { HintAdapter } from "./HintAdapter"

interface GroupAdapterProps {
  node: GroupNode
}

export const GroupAdapter = ({ node }: GroupAdapterProps) => {
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

  const children = node.children.map((child) => {
    switch (child.type) {
      case "Hint":
        return <HintAdapter key={child.nodeId} node={child} />
      default:
        return <DiscreteFieldAdapter key={child.nodeId} node={child} />
    }
  })

  if (isDesigning) {
    return <DraggableCanvasContainer node={node}>{children}</DraggableCanvasContainer>
  }

  return (
    <Group
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={disabled}
      hidden={hidden}
      border={node.border}
      direction={node.direction}
    >
      {children}
    </Group>
  )
}
