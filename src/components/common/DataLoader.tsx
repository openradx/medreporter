import { Trans } from "@lingui/react/macro"
import { Center, Loader, Stack, Text } from "@mantine/core"

export const DataLoader = () => (
  <Center py="xl">
    <Stack align="center">
      <Loader type="bars" />
      <Text>
        <Trans>Loading...</Trans>
      </Text>
    </Stack>
  </Center>
)
