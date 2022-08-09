import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "../../app/core/components/common/MainLayout"
import { PageWithLayout } from "../../app/core/types"
import { serverSideReduxState } from "../../app/core/utils/serverSideReduxState"
import { serverSideSiteTranslations } from "../../app/core/utils/serverSideSiteTranslations"
import { serverSideStructuredReportTranslations } from "../../app/core/utils/serverSideStructuredReportTranslations"
import { Sandbox } from "../../app/tools/sandbox/components/Sandbox"

const SandboxPage: PageWithLayout = () => <Sandbox />

SandboxPage.getLayout = (page: ReactElement) => <MainLayout fullScreen>{page}</MainLayout>

export default SandboxPage

export const getServerSideProps: GetServerSideProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideSiteTranslations(locale!, locales!)),
    ...(await serverSideStructuredReportTranslations(locale!, locale!, locales!, [
      "sandboxTool",
      "graphics",
    ])),
    ...(await serverSideReduxState({})),
  },
})
