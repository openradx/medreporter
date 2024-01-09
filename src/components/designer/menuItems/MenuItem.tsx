import { Card } from "@mantine/core"

interface MenuItemProps {
  label: string
}

export const MenuItem = ({ label }: MenuItemProps) => (
  <Card padding="xs" shadow="sm" radius="sm" withBorder>
    {label}
  </Card>
)
