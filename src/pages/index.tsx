import { fromNodeHeaders } from "better-auth/node"
import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { Home } from "~/components/home/Home"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { auth } from "~/server/auth"
import { getServerSideSiteTranslations } from "~/server/utils/siteTranslations"
import { PageWithLayout, ServerSideProps } from "~/types/general"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  locale,
  locales,
}) => ({
  props: {
    session: await auth.api.getSession({ headers: fromNodeHeaders(req.headers) }),
    i18nSite: await getServerSideSiteTranslations(locale, locales),
  },
})

const HomePage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("HomePage.pageTitle")} />
      <Home />
    </>
  )
}

HomePage.getLayout = (page: ReactElement) => (
  <MainLayout backgroundImage footerSize="none">
    {page}
  </MainLayout>
)

export default HomePage
