import { Trans } from "@lingui/react/macro"
import { Card, Text } from "@mantine/core"
import { ReactNode } from "react"
import { ContainerNode } from "~/utils/designerUtils"

interface ContainerDragOverlayProps {
  node: ContainerNode
  children?: ReactNode
}

export const ContainerDragOverlay = ({ node, children }: ContainerDragOverlayProps) => {
  const { type } = node

  let fieldId: string | undefined
  if ("fieldId" in node) {
    fieldId = node.fieldId
  }

  return (
    <Card padding="xs" shadow="sm" style={{ width: 250 }} withBorder>
      <Text>
        <Trans>Type: </Trans>
        {type}
      </Text>
      {fieldId && (
        <Text size="sm" c="dimmed">
          <Trans>Field ID: </Trans>
          {fieldId}
        </Text>
      )}
      <Card>{children}</Card>
    </Card>
  )
}
