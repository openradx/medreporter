import { Title, Flex, Stack } from "@mantine/core"
import { TemplateDesigner } from "./TemplateDesigner"

export const NewTemplate = () => (
  <Stack h="100%">
    <Flex mb={4} justify="space-between">
      <Title order={3} c="dimmed">
        Create new template
      </Title>
    </Flex>
    <TemplateDesigner />
  </Stack>
)
