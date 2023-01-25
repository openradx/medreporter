import { GetServerSideProps } from "next"
import { route } from "nextjs-routes"
import { ReactElement } from "react"
import { LoginForm } from "~/components/auth/LoginForm"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { getServerSideSession } from "~/utils/serverSideSession"
import { getServerSideSiteTranslations } from "~/utils/serverSideSiteTranslations"

export const getServerSideProps: GetServerSideProps = async ({ req, res, locale, locales }) => {
  const session = await getServerSideSession(req, res)

  if (session) {
    return {
      redirect: {
        destination: route({ pathname: "/" }),
        permanent: false,
      },
    }
  }

  const props: ServerSideProps = {
    session,
    i18nSite: await getServerSideSiteTranslations(locale, locales),
  }
  return { props }
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
