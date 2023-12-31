import { useIsDesigning } from "~/hooks/useIsDesigning"
import { evalCodeToBoolean } from "~/medtl/interpreter"
import { FreeTextFieldNode } from "~/schemas/structure"
import { DraggableCanvasItem } from "../designer/DraggableCanvasItem"
import { FreeTextField } from "../fields/FreeTextField"
import { Info } from "../template/Info"

interface FreeTextFieldAdapterProps {
  node: FreeTextFieldNode
}

export const FreeTextFieldAdapter = ({ node }: FreeTextFieldAdapterProps) => {
  const isDesigning = useIsDesigning()

  if (isDesigning) {
    return <DraggableCanvasItem node={node} />
  }

  return (
    <FreeTextField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={evalCodeToBoolean(node.disabled)}
      hidden={evalCodeToBoolean(node.hidden)}
      defaultValue={node.default}
      multiline={node.multiline}
    />
  )
}
