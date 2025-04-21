import { Trans } from "@lingui/react/macro"
import { Card, Text } from "@mantine/core"
import { StructuredReportNode } from "~/utils/designerUtils"

interface ItemDragOverlayProps {
  node: StructuredReportNode
}

export const ItemDragOverlay = ({ node }: ItemDragOverlayProps) => {
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
    </Card>
  )
}
