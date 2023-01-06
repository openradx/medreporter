import { Title, Text } from "@mantine/core"
import { trpc } from "~/utils/trpc"

export const Home = () => {
  const healthcheck = trpc.healthcheck.useQuery()

  let result = ""
  if (!healthcheck.data) {
    result = "Loading ..."
  } else {
    result = healthcheck.data
  }

  return (
    <>
      <Title align="center" mt={100}>
        Welcome to{" "}
        <Text inherit variant="gradient" component="span">
          MedReporter
        </Text>
        <Text>{result}</Text>
      </Title>
    </>
  )
}
