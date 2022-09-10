import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "app/core/components/common/MainLayout"
import { PageHead } from "app/core/components/common/PageHead"
import { PageWithLayout } from "app/core/types"
import { serverSideInitialPublicData } from "app/core/utils/serverSideInitialPublicData"
import { serverSideReduxState } from "app/core/utils/serverSideReduxState"
import { serverSideSiteTranslations } from "app/core/utils/serverSideSiteTranslations"
import { serverSideStructuredReportTranslations } from "app/core/utils/serverSideStructuredReportTranslations"
import { Sandbox } from "app/tools/sandbox/components/Sandbox"

const SandboxPage: PageWithLayout = () => (
  <>
    <PageHead title="Sandbox" />
    <Sandbox />
  </>
)

SandboxPage.getLayout = (page: ReactElement) => <MainLayout size="full">{page}</MainLayout>

export default SandboxPage

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await serverSideInitialPublicData(ctx)),
    ...(await serverSideSiteTranslations(ctx)),
    ...(await serverSideStructuredReportTranslations(ctx, ["sandboxTool", "graphics"])),
    ...serverSideReduxState({}),
  },
})
