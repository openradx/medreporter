import { Title, Text, Card, Grid, Image, Flex } from "@mantine/core"
import NextImage from "next/image"
import Link from "next/link"
import { appConfig } from "~/appConfig"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { useUser } from "~/hooks/useUser"
import exampleImage2 from "~/images/exampleImage2.png"
import exampleImage from "~/images/exampleImage.png"
import logo from "~/images/logo.png"
import toolsImage from "~/images/tools.png"
import { LoginForm } from "../auth/LoginForm"
import { InstituteSwitcher } from "./InstituteSwitcher"

export const Home = () => {
  const { t } = useSiteTranslation()
  const user = useUser()
  const loggedIn = !!user

  return (
    <Grid>
      <Grid.Col span={12}>
        <Title ta="center" mt={10}>
          <Flex direction="row" justify="center" align="center" gap="md">
            {t("Home.welcomeText")}
            <Image component={NextImage} src={logo} alt="Logo" h={64} w={64} />
            <Text
              inherit
              variant="gradient"
              gradient={{ from: "cyan", to: "teal", deg: 100 }}
              component="span"
            >
              {appConfig.medreporterTitle}
            </Text>
          </Flex>
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
      <Grid.Col span={{ xs: 12, sm: 6, xl: 6 }}>
        <Card shadow="sm" p="lg" radius="md" mih={192} style={{ cursor: "pointer" }} withBorder>
          <Card.Section>
            <Image component={NextImage} src={exampleImage2} alt="Example image" h={160} />
          </Card.Section>
          <Text fw={500} pt="xs">
            {t("Home.templatesTitle")}
          </Text>
          <Text size="sm" c="dimmed">
            {t("Home.templatesDescription")}
          </Text>
        </Card>
      </Grid.Col>
      {loggedIn && (
        <Grid.Col span={{ xs: 12, sm: 6, xl: 6 }}>
          <Link href="/templates/new" legacyBehavior>
            <Card shadow="sm" p="lg" radius="md" mih={192} style={{ cursor: "pointer" }} withBorder>
              <Card.Section>
                <Image component={NextImage} src={exampleImage} alt="Example image" h={160} />
              </Card.Section>
              <Text fw={500} pt="xs">
                {" "}
                {t("Home.newTitle")}
              </Text>
              <Text size="sm" c="dimmed">
                {t("Home.newDescription")}
              </Text>
            </Card>
          </Link>
        </Grid.Col>
      )}
      {loggedIn && (
        <Grid.Col span={{ xs: 12, sm: 6 }}>
          <Card shadow="sm" p="lg" radius="md" mih={192} style={{ cursor: "pointer" }} withBorder>
            <Card.Section>
              <Image component={NextImage} src={exampleImage2} alt="Example image" h={160} />
            </Card.Section>
            <Text fw={500} pt="xs">
              {t("Home.reportsTitle")}
            </Text>
            <Text size="sm" c="dimmed">
              {t("Home.reportsDescription")}
            </Text>
          </Card>
        </Grid.Col>
      )}
      <Grid.Col span={{ xs: 12, sm: 6 }}>
        <Link href="/templates" legacyBehavior>
          <Card shadow="sm" p="lg" radius="md" mih={192} style={{ cursor: "pointer" }} withBorder>
            <Card.Section>
              <Image component={NextImage} src={toolsImage} alt="Tools Image" h={160} />
            </Card.Section>
            <Text fw={500} pt="xs">
              {t("Home.templatesTitle")}
            </Text>
            <Text size="sm" c="dimmed">
              {t("Home.toolsDescription")}
            </Text>
          </Card>
        </Link>
      </Grid.Col>
    </Grid>
  )
}
