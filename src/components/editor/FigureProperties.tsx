import { Container, Group, Stack, Text, Title } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const FigureProperties = () => {
  const { t } = useSiteTranslation()

  return (
    <Container>
      <Stack>
        <Title order={3}>{t("FigureProperties.title")}</Title>
        <Group>
          <Text>Name</Text>
        </Group>
      </Stack>
    </Container>
  )
}
