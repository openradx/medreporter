import { Trans } from "@lingui/react/macro"
import { Title, Text, Image, Flex, Container, Button, Group } from "@mantine/core"
import cx from "clsx"
import NextImage from "next/image"
import Link from "next/link"
import { appConfig } from "~/appConfig"
import { useUser } from "~/hooks/useUser"
import logo from "~/images/logo.png"
import { CopyrightMessage } from "../common/CopyrightMessage"
import classes from "./Home.module.css"

export const Home = () => {
  const user = useUser()
  const loggedIn = !!user

  return (
    <Container className={classes.container} size="md">
      <Title className={classes.title}>
        <Flex direction="row" justify="center" align="center" gap="md">
          <Trans>Welcome to</Trans>
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
        <Trans>
          A platform for creating structured medical reports. Use our pre-designed templates without
          logging in, or sign up to create your own templates, save completed reports, and share
          them with members of your institution.
        </Trans>
      </Text>
      <Group className={classes.controls}>
        <Link href="/templates" legacyBehavior>
          <Button className={classes.control} variant="white" size="lg">
            <Trans>Browse Templates</Trans>
          </Button>
        </Link>
        {loggedIn && (
          <Link href="/templates/new" legacyBehavior>
            <Button className={cx(classes.control, classes.secondaryControl)} size="lg">
              <Trans>New Template</Trans>
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
