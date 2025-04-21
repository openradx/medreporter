import { Trans } from "@lingui/react/macro"
import { useRouter } from "next/router"
import { PageLink } from "../common/PageLink"

export const LoginLink = () => {
  const router = useRouter()

  return (
    <PageLink url={{ pathname: "/auth/login", query: { callbackUrl: router.asPath } }}>
      <Trans>Login</Trans>
    </PageLink>
  )
}
