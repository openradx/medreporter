import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { Sandbox } from "~/components/tools/sandbox/Sandbox"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { getServerSideSession } from "~/utils/serverSideSession"
import { getServerSideSiteTranslations } from "~/utils/serverSideSiteTranslations"
import { getServerSideStructuredReportTranslations } from "~/utils/serverSideStructuredReportTranslations"

export const getServerSideProps: GetServerSideProps = async ({ req, res, locale, locales }) => {
  const props: ServerSideProps = {
    session: await getServerSideSession(req, res),
    i18nSite: await getServerSideSiteTranslations(locale, locales),
    i18nStructuredReport: await getServerSideStructuredReportTranslations(locale, locales, [
      "sandboxTool",
      "graphics",
    ]),
    preloadedReduxState: {},
  }
  return { props }
}

const SandboxPage: PageWithLayout = () => (
  <>
    <PageHead title="Sandbox" />
    <Sandbox />
  </>
)

SandboxPage.getLayout = (page: ReactElement) => <MainLayout size="full">{page}</MainLayout>

export default SandboxPage
