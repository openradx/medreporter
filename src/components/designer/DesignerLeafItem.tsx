import { Card, Text } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { AddableNode, isContainerNode } from "~/utils/editorUtils"

interface DesignerLeafItemProps {
  node: AddableNode
}

export const DesignerLeafItem = ({ node }: DesignerLeafItemProps) => {
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
    </Card>
  )
}
