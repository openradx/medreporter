import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { Fleischner2017 } from "~/components/tools/fleischner2017/Fleischner2017"
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
      "fleischner2017",
      "graphics",
    ]),
    preloadedReduxState: {},
  }
  return { props }
}

const Fleischner2017Page: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("Fleischner2017Page.toolTitle")} />
      <Fleischner2017 />
    </>
  )
}

Fleischner2017Page.getLayout = (page: ReactElement) => <MainLayout size="full">{page}</MainLayout>

export default Fleischner2017Page
