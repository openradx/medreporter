import { Title, Text, Image, Flex, Container, Button, Group } from "@mantine/core"
import cx from "clsx"
import NextImage from "next/image"
import Link from "next/link"
import { appConfig } from "~/appConfig"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { useUser } from "~/hooks/useUser"
import logo from "~/images/logo.png"
import { CopyrightMessage } from "../common/CopyrightMessage"
import classes from "./Home.module.css"

export const Home = () => {
  const { t } = useSiteTranslation()
  const user = useUser()
  const loggedIn = !!user

  return (
    <Container className={classes.container} size="md">
      <Title className={classes.title}>
        <Flex direction="row" justify="center" align="center" gap="md">
          {t("Home.welcomeText")}
          <Image component={NextImage} src={logo} alt="Logo" h={100} w={100} />
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
      <Text size="xl" mt="xl" className={classes.description}>
        {t("Home.homeDescription")}
      </Text>
      <Group className={classes.controls}>
        <Link href="/templates" legacyBehavior>
          <Button className={classes.control} variant="white" size="lg">
            {t("Home.templatesTitle")}
          </Button>
        </Link>
        {loggedIn && (
          <Link href="/templates/new" legacyBehavior>
            <Button className={cx(classes.control, classes.secondaryControl)} size="lg">
              {t("Home.newTitle")}
            </Button>
          </Link>
        )}
      </Group>
      <div className={classes.footer}>
        <CopyrightMessage />
      </div>
    </Container>
  )
}
