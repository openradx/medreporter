import { useRouter } from "next/router"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { PageLink } from "../common/PageLink"

export const LoginLink = () => {
  const { t } = useSiteTranslation()
  const router = useRouter()

  return (
    <PageLink url={{ pathname: "/auth/login", query: { callbackUrl: router.asPath } }}>
      {t("LoginLink.text")}
    </PageLink>
  )
}
