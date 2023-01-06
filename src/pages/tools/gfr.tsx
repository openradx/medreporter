import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { Gfr } from "~/components/tools/gfr/Gfr"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { PageWithLayout, ServerSideProps } from "~/types"
import { getServerSideSession } from "~/utils/serverSideSession"
import { getServerSideSiteTranslations } from "~/utils/serverSideSiteTranslations"
import { getServerSideStructuredReportTranslations } from "~/utils/serverSideStructuredReportTranslations"

export const getServerSideProps: GetServerSideProps = async ({ req, res, locale, locales }) => {
  const props: ServerSideProps = {
    session: await getServerSideSession(req, res),
    i18nSite: await getServerSideSiteTranslations(locale, locales),
    i18nStructuredReport: await getServerSideStructuredReportTranslations(locale, locales, [
      "gfr",
      "graphics",
    ]),
    preloadedReduxState: {},
  }
  return { props }
}

const GfrPage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("GfrPage.toolTitle")} />
      <Gfr />
    </>
  )
}

GfrPage.getLayout = (page: ReactElement) => <MainLayout size="full">{page}</MainLayout>

export default GfrPage
