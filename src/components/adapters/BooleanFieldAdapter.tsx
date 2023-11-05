import { useDesigner } from "~/contexts/DesignerContext"
import { evalCodeToBoolean } from "~/medtl/interpreter"
import { BooleanFieldNode } from "~/schemas/structure"
import { DesignerLeafItem } from "../designer/DesignerLeafItem"
import { SortableItem } from "../designer/SortableItem"
import { BooleanField } from "../fields/BooleanField"
import { Info } from "../template/Info"

interface BooleanFieldAdapterProps {
  node: BooleanFieldNode
}

export const BooleanFieldAdapter = ({ node }: BooleanFieldAdapterProps) => {
  const designer = useDesigner()

  if (designer?.designMode) {
    return (
      <SortableItem node={node}>
        <DesignerLeafItem node={node} />
      </SortableItem>
    )
  }
  return (
    <BooleanField
      id={node.fieldId}
      label={node.label}
      extras={node.info && <Info>{node.info}</Info>}
      disabled={evalCodeToBoolean(node.disabled)}
      hidden={evalCodeToBoolean(node.hidden)}
      defaultValue={node.default}
    />
  )
}
