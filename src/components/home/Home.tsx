import { Title, Text, Card, Grid, Button, Image, Box } from "@mantine/core"
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
    <Grid align="stretch">
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
        <Grid.Col span={8} offset={2}>
          <LoginForm />
        </Grid.Col>
      )}
      {loggedIn && (
        <Grid.Col span={8} offset={2}>
          <InstituteSwitcher />
        </Grid.Col>
      )}
      <Grid.Col xs={12} sm={loggedIn ? 6 : 4}>
        <Card shadow="sm" p="lg" radius="md" withBorder style={{ minHeight: 220 }}>
          <Card.Section>
            <Image src="/tools.png" height={120} fit="contain" alt="Tools Image" />
          </Card.Section>
          <Text weight={500}>{t("HomePage.toolsTitle")}</Text>{" "}
          <Text size="sm" color="dimmed">
            {t("HomePage.toolsDescription")}
          </Text>
          <Link href="/tools">
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              {t("HomePage.toolsButton")}
            </Button>
          </Link>
        </Card>
      </Grid.Col>
      {loggedIn && (
        <Grid.Col xs={12} sm={loggedIn ? 6 : 4}>
          <Card shadow="sm" p="lg" radius="md" withBorder style={{ minHeight: 220 }}>
            <Card.Section>
              <Image src="/exampleImage2.png" height={120} fit="contain" alt="Example image" />
            </Card.Section>
            <Text weight={500}>{t("HomePage.reportsTitle")}</Text>{" "}
            <Text size="sm" color="dimmed">
              {t("HomePage.reportsDescription")}
            </Text>
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              {t("HomePage.reportsButton")}
            </Button>
          </Card>
        </Grid.Col>
      )}
      <Grid.Col xs={12} sm={loggedIn ? 6 : 4} xl={4}>
        <Card shadow="sm" p="lg" radius="md" withBorder style={{ minHeight: 220 }}>
          <Card.Section>
            <Image src="/exampleImage.png" height={120} fit="contain" alt="Example image" />
          </Card.Section>
          <Text weight={500}>{t("HomePage.modulesTitle")}</Text>{" "}
          <Text size="sm" color="dimmed">
            {t("HomePage.modulesDescription")}
          </Text>
          <Link href="/modules">
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              {t("HomePage.modulesButton")}
            </Button>
          </Link>
        </Card>
      </Grid.Col>
      <Grid.Col xs={12} sm={loggedIn ? 6 : 4} xl={4}>
        <Card shadow="sm" p="lg" radius="md" withBorder style={{ minHeight: 220 }}>
          <Card.Section>
            <Image src="/exampleImage2.png" height={120} fit="contain" alt="Example image" />
          </Card.Section>
          <Text weight={500}>{t("HomePage.templatesTitle")}</Text>{" "}
          <Text size="sm" color="dimmed">
            {t("HomePage.templatesDescription")}
          </Text>
          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            {t("HomePage.templatesButton")}
          </Button>
        </Card>
      </Grid.Col>
      {loggedIn && (
        <Grid.Col xs={12} sm={6} xl={4}>
          <Card shadow="sm" p="lg" radius="md" withBorder style={{ minHeight: 220 }}>
            <Card.Section>
              <Image src="/demoEditor.gif" height={120} fit="contain" alt="Editor demo" />
            </Card.Section>
            <Text weight={500}>{t("HomePage.newTitle")}</Text>{" "}
            <Text size="sm" color="dimmed">
              {t("HomePage.newDescription")}
            </Text>
            <Box style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <Button variant="light" color="blue" mt="md" radius="md" style={{ flexGrow: 1 }}>
                {t("HomePage.newModuleButton")}
              </Button>{" "}
              <Button variant="light" color="blue" mt="md" radius="md" style={{ flexGrow: 1 }}>
                {t("HomePage.newTemplateButton")}
              </Button>
            </Box>
          </Card>
        </Grid.Col>
      )}
    </Grid>
  )
}
