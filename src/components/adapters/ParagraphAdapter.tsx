import { useIsDesigning } from "~/hooks/useIsDesigning"
import { evalCodeToBoolean } from "~/medtl/interpreter"
import { ParagraphNode } from "~/schemas/report"
import { DraggableCanvasContainer } from "../designer/DraggableCanvasContainer"
import { Paragraph } from "../template/Paragraph"
import { StatementAdapter } from "./StatementAdapter"

interface ParagraphAdapterProps {
  node: ParagraphNode
}

export const ParagraphAdapter = ({ node }: ParagraphAdapterProps) => {
  const isDesigning = useIsDesigning()

  const children = node.children.map((child) => (
    <StatementAdapter key={child.nodeId} node={child} />
  ))

  if (isDesigning) {
    return <DraggableCanvasContainer node={node}>{children}</DraggableCanvasContainer>
  }

  return (
    <Paragraph
      title={node.title}
      link={node.link}
      hidden={evalCodeToBoolean(node.hidden)}
      list={node.list}
    >
      {children}
    </Paragraph>
  )
}
