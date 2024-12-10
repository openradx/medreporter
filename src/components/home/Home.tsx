import { Title, Text, Image, Flex, Container, Button } from "@mantine/core"
import cx from "clsx"
import NextImage from "next/image"
import Link from "next/link"
import { appConfig } from "~/appConfig"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { useUser } from "~/hooks/useUser"
import logo from "~/images/logo.png"
import classes from "./Home.module.css"

export const Home = () => {
  const { t } = useSiteTranslation()
  const user = useUser()
  const loggedIn = !!user

  return (
    <div className={classes.wrapper}>
      <div className={classes.inner}>
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

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            {t("Home.homeDescription")}
          </Text>
        </Container>

        <div className={classes.controls}>
          <Link href="/tools" legacyBehavior>
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
        </div>
      </div>
    </div>
  )
}
