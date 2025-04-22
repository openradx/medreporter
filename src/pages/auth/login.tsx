import { fromNodeHeaders } from "better-auth/node"
import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { LoginForm } from "~/components/auth/LoginForm"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { auth } from "~/server/auth"
import { getServerSideSiteTranslations } from "~/server/utils/siteTranslations"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { redirectToLogin } from "~/utils/redirects"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  locale,
  locales,
}) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })

  if (session) {
    return redirectToLogin(locale)
  }

  return {
    props: {
      session,
      i18nSite: await getServerSideSiteTranslations(locale, locales),
    },
  }
}

const LoginPage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("LoginPage.pageTitle")} />
      <LoginForm />
    </>
  )
}

LoginPage.getLayout = (page: ReactElement) => <MainLayout size="sm">{page}</MainLayout>

export default LoginPage
