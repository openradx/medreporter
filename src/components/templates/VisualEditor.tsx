import { Grid, Box, Accordion, Card, Title } from "@mantine/core"

export const VisualEditor = () => (
  <>
    <Grid sx={{ height: "100%" }}>
      <Grid.Col span={3}>
        <Card shadow="sm" padding="lg" radius="md" withBorder sx={{ height: "100%" }}>
          <Title order={5} color="dimmed">
            Elements
          </Title>
          <Accordion defaultValue="fields" variant="contained">
            <Accordion.Item value="fields">
              <Accordion.Control>Fields</Accordion.Control>
              <Accordion.Panel>
                <Box>- BooleanField </Box>
                <Box>- DateField </Box>
                <Box>- FreeTextField </Box>
                <Box>- MeasurementsField </Box>
                <Box>- MultipleChoiceField </Box>
                <Box>- NumberField </Box>
                <Box>- SingleChoiceField </Box>
                <Box>- TimeField </Box>
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
      </Grid.Col>
      <Grid.Col span={6}>
        <Card shadow="sm" padding="lg" radius="md" withBorder sx={{ height: "100%" }}>
          Drag your components here.
        </Card>
      </Grid.Col>
      <Grid.Col span={3}>
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
      </Grid.Col>
    </Grid>
  </>
)
