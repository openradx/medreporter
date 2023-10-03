import { Title, Text, Card, Grid, Image } from "@mantine/core"
import Link from "next/link"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { useUser } from "~/hooks/useUser"
import { LoginForm } from "../auth/LoginForm"
import { InstituteSwitcher } from "./InstituteSwitcher"

export const Home = () => {
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
      <Grid.Col xs={12} sm={6} xl={6}>
        <Card
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
          style={{ cursor: "pointer", minHeight: "12rem" }}
        >
          <Card.Section>
            <Image src="/exampleImage2.png" height="10rem" fit="contain" alt="Example image" />
          </Card.Section>
          <Text weight={500}>{t("HomePage.templatesTitle")}</Text>
          <Text size="sm" color="dimmed">
            {t("HomePage.templatesDescription")}
          </Text>
        </Card>
      </Grid.Col>
      {loggedIn && (
        <Grid.Col xs={12} sm={6} xl={6}>
          <Link href="/templates/new" legacyBehavior>
            <Card
              shadow="sm"
              p="lg"
              radius="md"
              withBorder
              sx={{ cursor: "pointer", minHeight: "12rem" }}
            >
              <Card.Section>
                <Image src="/exampleImage.png" height="10rem" fit="contain" alt="Editor demo" />
              </Card.Section>
              <Text weight={500}> {t("HomePage.newTitle")}</Text>
              <Text size="sm" color="dimmed">
                {t("HomePage.newDescription")}
              </Text>
            </Card>
          </Link>
        </Grid.Col>
      )}
      {loggedIn && (
        <Grid.Col xs={12} sm={6}>
          <Card
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            sx={{ cursor: "pointer", minHeight: "12rem" }}
          >
            <Card.Section>
              <Image src="/exampleImage2.png" height="10rem" fit="contain" alt="Example image" />
            </Card.Section>
            <Text weight={500}>{t("HomePage.reportsTitle")}</Text>{" "}
            <Text size="sm" color="dimmed">
              {t("HomePage.reportsDescription")}
            </Text>
          </Card>
        </Grid.Col>
      )}
      <Grid.Col xs={12} sm={6}>
        <Link href="/tools" legacyBehavior>
          <Card
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            sx={{ cursor: "pointer", minHeight: "12rem" }}
          >
            <Card.Section>
              <Image src="/tools.png" height="10rem" fit="contain" alt="Tools Image" />
            </Card.Section>
            <Text weight={500}>{t("HomePage.toolsTitle")}</Text>{" "}
            <Text size="sm" color="dimmed">
              {t("HomePage.toolsDescription")}
            </Text>
          </Card>
        </Link>
      </Grid.Col>
    </Grid>
  )
}
