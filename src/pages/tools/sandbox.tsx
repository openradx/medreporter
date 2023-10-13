import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { getServerSideSession } from "~/server/utils/sessionUtils"
import { getServerSideSiteTranslations } from "~/server/utils/siteTranslations"
import { getServerSideStructuredReportTranslations } from "~/server/utils/structuredReportTranslations"
import { Sandbox } from "~/tools/sandbox/Sandbox"
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
      "sandboxTool",
      "graphics",
    ]),
    preloadedReduxState: {},
  },
})

const SandboxPage: PageWithLayout = () => (
  <>
    <PageHead title="Sandbox" />
    <Sandbox />
  </>
)

SandboxPage.getLayout = (page: ReactElement) => (
  <MainLayout size="full" footerSize="small">
    {page}
  </MainLayout>
)

export default SandboxPage
