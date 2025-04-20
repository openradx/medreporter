import { useLingui, Trans } from "@lingui/react/macro"
import { Alert, Container } from "@mantine/core"
import { useTimeout } from "@mantine/hooks"
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"
import { FallbackProps } from "react-error-boundary"
import { AuthenticationError, AuthorizationError } from "~/errors"

export const MainLayoutFallback = ({ error }: FallbackProps) => {
  const { t } = useLingui()
  const router = useRouter()

  const { start, clear } = useTimeout(() => {
    if (error instanceof AuthenticationError) {
      router.push({
        pathname: "/auth/login",
        query: {
          callbackUrl: router.asPath,
          unauthorized: "true",
        },
      })
    }
  }, 10000)

  useEffect(
    () => () => {
      clear()
    },
    [clear]
  )

  let node: ReactNode = null

  if (error instanceof AuthenticationError) {
    node = (
      <Alert title={t`Authentication Error`} color="red">
        <Trans>
          Only authenticated users can access this page. You will be redirected to the login page in
          10 seconds.
        </Trans>
      </Alert>
    )
    start()
  } else if (error instanceof AuthorizationError) {
    node = (
      <Alert title={t`Permission Denied`} color="red">
        <Trans>You are not authorized to access this page.</Trans>
      </Alert>
    )
  } else {
    throw error
  }

  return <Container size="md">{node}</Container>
}
