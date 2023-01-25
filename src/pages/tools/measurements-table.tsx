import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { MeasurementsTable } from "~/components/tools/measurementsTable/MeasurementsTable"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { getServerSideSession } from "~/utils/serverSideSession"
import { getServerSideSiteTranslations } from "~/utils/serverSideSiteTranslations"
import { getServerSideStructuredReportTranslations } from "~/utils/serverSideStructuredReportTranslations"

export const getServerSideProps: GetServerSideProps = async ({ req, res, locale, locales }) => {
  const props: ServerSideProps = {
    session: await getServerSideSession(req, res),
    i18nSite: await getServerSideSiteTranslations(locale, locales),
    i18nStructuredReport: await getServerSideStructuredReportTranslations(locale, locales, [
      "measurementsTable",
    ]),
    preloadedReduxState: {},
  }
  return { props }
}

const MeasurementsTablePage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("MeasurementsTablePage.pageTitle")} />
      <MeasurementsTable />
    </>
  )
}

MeasurementsTablePage.getLayout = (page: ReactElement) => (
  <MainLayout size="full">{page}</MainLayout>
)

export default MeasurementsTablePage
