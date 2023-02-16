import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { KidneyVolume } from "~/components/tools/kidneyVolume/KidneyVolume"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { getServerSideSession } from "~/server/utils/sessionUtils"
import { getServerSideSiteTranslations } from "~/server/utils/siteTranslations"
import { getServerSideStructuredReportTranslations } from "~/server/utils/structuredReportTranslations"
import { PageWithLayout, ServerSideProps } from "~/types/general"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  res,
  locale,
  locales,
}) => ({
  props: {
    session: await getServerSideSession(req, res),
    i18nSite: await getServerSideSiteTranslations(locale, locales),
    i18nStructuredReport: await getServerSideStructuredReportTranslations(locale, locales, [
      "kidneyVolume",
    ]),
    preloadedReduxState: {},
  },
})

const KidneyVolumePage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("KidneyVolumePage.toolTitle")} />
      <KidneyVolume />
    </>
  )
}

KidneyVolumePage.getLayout = (page: ReactElement) => <MainLayout size="full">{page}</MainLayout>

export default KidneyVolumePage
