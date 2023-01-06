import { Alert, Container } from "@mantine/core"
import { useTimeout } from "@mantine/hooks"
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"
import { FallbackProps } from "react-error-boundary"
import { AuthenticationError, AuthorizationError } from "~/errors"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const MainLayoutFallback = ({ error }: FallbackProps) => {
  const { t } = useSiteTranslation()
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
      <Alert title={t("MainLayoutFallback.titleAuthenticationError")}>
        {t("MainLayoutFallback.messageAuthenticationError")}
      </Alert>
    )
    start()
  } else if (error instanceof AuthorizationError) {
    node = (
      <Alert title={t("MainLayoutFallback.titleAuthorizationError")}>
        {t("MainLayoutFallback.messageAuthorizationError")}
      </Alert>
    )
  } else {
    throw error
  }

  return <Container size="md">{node}</Container>
}
