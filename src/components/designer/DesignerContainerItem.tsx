import { Card, Text } from "@mantine/core"
import { ReactNode } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { ContainerNode } from "~/utils/designerUtils"

interface DesignerContainerItemProps {
  node: ContainerNode
  children?: ReactNode
}

export const DesignerContainerItem = ({ node, children }: DesignerContainerItemProps) => {
  const { t } = useSiteTranslation()

  const { type } = node

  let fieldId: string | undefined
  if ("fieldId" in node) {
    fieldId = node.fieldId
  }

  return (
    <Card padding="xs" shadow="sm" style={{ width: 250 }} withBorder>
      <Text>
        {t("EditorItem.id")}: {fieldId ?? "-"}
      </Text>
      <Text size="sm" color="dimmed">
        {t("EditorItem.type")}: {type}
      </Text>
      <Card>{children}</Card>
    </Card>
  )
}
