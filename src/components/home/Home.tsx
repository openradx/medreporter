import { Trans } from "@lingui/react/macro"
import { Title, Text, Image, Flex, Container, Button, Group } from "@mantine/core"
import cx from "clsx"
import NextImage from "next/image"
import Link from "next/link"
import { appConfig } from "~/appConfig"
import { useScreenSize } from "~/hooks/useScreenSize"
import { useUser } from "~/hooks/useUser"
import logo from "~/images/logo.png"
import { CopyrightMessage } from "../common/CopyrightMessage"
import classes from "./Home.module.css"

export const Home = () => {
  const user = useUser()
  const loggedIn = !!user
  const screenSize = useScreenSize()

  const logoSize = {
    xs: 60,
    sm: 80,
    md: 90,
    lg: 100,
    xl: 120,
  }[screenSize]

  return (
    <Container className={classes.container} size="md">
      <Flex direction="column" justify="space-between" style={{ height: "100%" }}>
        <div className={classes.content}>
          <Title className={classes.title}>
            <Flex
              direction={screenSize === "xs" ? "column" : "row"}
              justify="center"
              align="center"
              gap="md"
            >
              <Trans>Welcome to</Trans>
              <Image component={NextImage} src={logo} alt="Logo" h={logoSize} w={logoSize} />
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
          <Text size={screenSize === "xs" ? "lg" : "xl"} mt="xl" className={classes.description}>
            <Trans>
              A platform for creating structured medical reports. Use our pre-designed templates
              without logging in, or sign up to create your own templates, save completed reports,
              and share them with members of your institution.
            </Trans>
          </Text>
          <Group className={classes.controls}>
            <Link href="/templates" className={classes.legacyLink}>
              <Button
                className={classes.control}
                variant="white"
                size={screenSize === "xs" ? "md" : "lg"}
              >
                <Trans>Browse Templates</Trans>
              </Button>
            </Link>
            {loggedIn && (
              <Link href="/templates/new" className={classes.legacyLink}>
                <Button
                  className={cx(classes.control, classes.secondaryControl)}
                  size={screenSize === "xs" ? "md" : "lg"}
                >
                  <Trans>New Template</Trans>
                </Button>
              </Link>
            )}
          </Group>
        </div>
        <div className={classes.footer}>
          <CopyrightMessage />
        </div>
      </Flex>
    </Container>
  )
}
