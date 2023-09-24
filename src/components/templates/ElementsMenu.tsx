import { Box, Accordion, Card, Title } from "@mantine/core"
import { DraggableElement } from "./DraggableElement"

export const ElementsMenu = () => (
  <Card shadow="sm" padding="lg" radius="md" withBorder sx={{ height: "100%" }}>
    <Title order={5} color="dimmed">
      Elements
    </Title>
    <Accordion defaultValue="fields" variant="contained">
      <Accordion.Item value="fields">
        <Accordion.Control>Fields</Accordion.Control>
        <Accordion.Panel>
          <DraggableElement label="Boolean" />
          <DraggableElement label="Date" />
          <DraggableElement label="Time" />
          <DraggableElement label="Free Text" />
          <DraggableElement label="Measurements" />
          <DraggableElement label="Single Choice" />
          <DraggableElement label="Multiple Choice" />
          <DraggableElement label="Number" />
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
