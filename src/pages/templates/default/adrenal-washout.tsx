import { fromNodeHeaders } from "better-auth/node"
import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { AdrenalWashout } from "~/default-templates/adrenalWashout/AdrenalWashout"
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
    i18nSite: await getServerSideSiteTranslations(locale, locales, ["template"]),
    preloadedReduxState: {},
  },
})

const AdrenalWashoutPage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("AdrenalWashoutPage.toolTitle")} />
      <AdrenalWashout />
    </>
  )
}

AdrenalWashoutPage.getLayout = (page: ReactElement) => (
  <MainLayout size="full" footerSize="small">
    {page}
  </MainLayout>
)

export default AdrenalWashoutPage
