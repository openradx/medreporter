import { ReactElement } from "react"
import { gSSP } from "../../app/blitz-server"
import { MainLayout } from "../../app/core/components/common/MainLayout"
import { Tools } from "../../app/core/components/tools/Tools"
import { PageWithLayout } from "../../app/core/types"
import { serverSideInitialPublicData } from "../../app/core/utils/serverSideInitialPublicData"
import { serverSideSiteTranslations } from "../../app/core/utils/serverSideSiteTranslations"

const ToolsPage: PageWithLayout = () => <Tools />

ToolsPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default ToolsPage

export const getServerSideProps = gSSP(async (ctx) => ({
  props: {
    ...(await serverSideInitialPublicData(ctx)),
    ...(await serverSideSiteTranslations(ctx, ["tools"])),
  },
}))
