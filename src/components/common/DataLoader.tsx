import { Center, Loader, Stack, Text } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const DataLoader = () => {
  const { t } = useSiteTranslation()

  return (
    <Center py="xl">
      <Stack>
        <Loader variant="bars" />
        <Text>{t("DataLoader.subtitle")}</Text>
      </Stack>
    </Center>
  )
}