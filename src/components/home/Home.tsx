import { Title, Text, Card, Grid, Button } from "@mantine/core"
import Link from "next/link"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { useUser } from "~/hooks/useUser"
import { trpc } from "~/utils/trpc"
import { LoginForm } from "../auth/LoginForm"
import { InstituteSwitcher } from "./InstituteSwitcher"

export const Home = () => {
  const healthcheck = trpc.healthcheck.useQuery()

  let result = ""
  if (!healthcheck.data) {
    result = "Loading ..."
  } else {
    result = healthcheck.data
  }

  const { t } = useSiteTranslation()
  const user = useUser()
  const loggedIn = !!user

  return (
    <Grid>
      <Grid.Col span={12}>
        <Title align="center" mt={100}>
          Welcome to{" "}
          <Text inherit variant="gradient" component="span">
            MedReporter
          </Text>
          <Text>{result}</Text>
        </Title>
      </Grid.Col>
      {!loggedIn && (
        <Grid.Col span={12}>
          <LoginForm />
        </Grid.Col>
      )}
      {loggedIn && (
        <Grid.Col span={12}>
          <InstituteSwitcher />
        </Grid.Col>
      )}
      <Grid.Col sm={12} md={4}>
        <Card shadow="sm" p="lg" radius="md" withBorder style={{ minHeight: 80 }}>
          <Text weight={500}>{t("HomePage.tools.title")}</Text>{" "}
          <Text size="sm" color="dimmed">
            {t("HomePage.tools.description")}
          </Text>
          <Link href="/tools">
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              {t("HomePage.tools.button")}
            </Button>
          </Link>
        </Card>
      </Grid.Col>
      <Grid.Col sm={12} md={4}>
        <Card shadow="sm" p="lg" radius="md" withBorder style={{ minHeight: 80 }}>
          <Text weight={500}>{t("HomePage.modules.title")}</Text>{" "}
          <Text size="sm" color="dimmed">
            {t("HomePage.modules.description")}
          </Text>
          <Link href="/modules">
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              {t("HomePage.modules.button")}
            </Button>
          </Link>
        </Card>
      </Grid.Col>
      <Grid.Col sm={12} md={4}>
        <Card shadow="sm" p="lg" radius="md" withBorder style={{ minHeight: 80 }}>
          <Text weight={500}>{t("HomePage.editor.title")}</Text>{" "}
          <Text size="sm" color="dimmed">
            {t("HomePage.editor.description")}
          </Text>
          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            {t("HomePage.editor.button")}
          </Button>
        </Card>
      </Grid.Col>
    </Grid>
  )
}
