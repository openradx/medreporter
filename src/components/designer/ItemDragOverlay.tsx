import { Card, Text } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { StructuredReportNode } from "~/utils/designerUtils"

interface ItemDragOverlayProps {
  node: StructuredReportNode
}

export const ItemDragOverlay = ({ node }: ItemDragOverlayProps) => {
  const { t } = useSiteTranslation()

  const { type } = node

  let fieldId: string | undefined
  if ("fieldId" in node) {
    fieldId = node.fieldId
  }

  return (
    <Card padding="xs" shadow="sm" style={{ width: 250 }} withBorder>
      <Text>
        {t("ItemDragOverlay.type")}: {type}
      </Text>
      {fieldId && (
        <Text size="sm" c="dimmed">
          {t("ItemDragOverlay.id")}: {fieldId}
        </Text>
      )}
    </Card>
  )
}
