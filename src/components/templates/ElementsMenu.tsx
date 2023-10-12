import { Box, Accordion, Card, Title } from "@mantine/core"
import { MenuElement } from "./MenuElement"

export const ElementsMenu = () => (
  <Card shadow="sm" padding="lg" radius="md" withBorder sx={{ height: "100%" }}>
    <Title order={5} color="dimmed">
      Elements
    </Title>
    <Accordion defaultValue="fields" variant="contained">
      <Accordion.Item value="fields">
        <Accordion.Control>Fields</Accordion.Control>
        <Accordion.Panel>
          <MenuElement id="menu-Boolean" label="Boolean" />
          <MenuElement id="menu-Date" label="Date" />
          <MenuElement id="menu-Time" label="Time" />
          <MenuElement id="menu-FreeText" label="Free Text" />
          <MenuElement id="menu-Measurements" label="Measurements" />
          <MenuElement id="menu-SingleChoice" label="Single Choice" />
          <MenuElement id="menu-MultipleChoice" label="Multiple Choice" />
          <MenuElement id="menu-Number" label="Number" />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="sectioning">
        <Accordion.Control>Sectioning</Accordion.Control>
        <Accordion.Panel>
          <Box>- Group </Box>
          <Box>- Finding </Box>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  </Card>
)
