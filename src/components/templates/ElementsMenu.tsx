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
          <DraggableElement id="boolean" label="Boolean" />
          <DraggableElement id="date" label="Date" />
          <DraggableElement id="time" label="Time" />
          <DraggableElement id="free-text" label="Free Text" />
          <DraggableElement id="measurements" label="Measurements" />
          <DraggableElement id="single-choice" label="Single Choice" />
          <DraggableElement id="multiple-choice" label="Multiple Choice" />
          <DraggableElement id="number" label="Number" />
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
