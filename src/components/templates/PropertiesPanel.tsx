import { Box, Accordion, Card, Title } from "@mantine/core"

export const PropertiesPanel = () => (
  <Card shadow="sm" padding="lg" radius="md" withBorder sx={{ height: "100%" }}>
    <Title order={5} color="dimmed">
      Properties
    </Title>
    <Accordion defaultValue="fields" variant="contained">
      <Accordion.Item value="fields">
        <Accordion.Control>Properties</Accordion.Control>
        <Accordion.Panel>
          <Box>- Label </Box>
          <Box>- ID </Box>
          <Box>- Placeholder </Box>
          <Box>- Options </Box>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="dependencies">
        <Accordion.Control>Dependencies</Accordion.Control>
        <Accordion.Panel>
          <Box>- disabled if </Box>
          <Box>- hidden if </Box>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  </Card>
)
