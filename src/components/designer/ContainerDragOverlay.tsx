import { Card, Text } from "@mantine/core"
import { ReactNode } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { ContainerNode } from "~/utils/designerUtils"

interface ContainerDragOverlayProps {
  node: ContainerNode
  children?: ReactNode
}

export const ContainerDragOverlay = ({ node, children }: ContainerDragOverlayProps) => {
  const { t } = useSiteTranslation()

  const { type } = node

  let fieldId: string | undefined
  if ("fieldId" in node) {
    fieldId = node.fieldId
  }

  return (
    <Card padding="xs" shadow="sm" style={{ width: 250 }} withBorder>
      <Text>
        {t("ContainerDragOverlay.type")}: {type}
      </Text>
      {fieldId && (
        <Text size="sm" c="dimmed">
          {t("ContainerDragOverlay.id")}: {fieldId}
        </Text>
      )}
      <Card>{children}</Card>
    </Card>
  )
}
