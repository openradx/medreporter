import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "../../app/core/components/common/MainLayout"
import { PageWithLayout } from "../../app/core/types"
import { serverSideInitialPublicData } from "../../app/core/utils/serverSideInitialPublicData"
import { serverSideReduxState } from "../../app/core/utils/serverSideReduxState"
import { serverSideSiteTranslations } from "../../app/core/utils/serverSideSiteTranslations"
import { serverSideStructuredReportTranslations } from "../../app/core/utils/serverSideStructuredReportTranslations"
import { GFR } from "../../app/tools/gfr/components/GFR"

const GFRPage: PageWithLayout = () => <GFR />

GFRPage.getLayout = (page: ReactElement) => <MainLayout fullScreen>{page}</MainLayout>

export default GFRPage

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await serverSideInitialPublicData(ctx)),
    ...(await serverSideSiteTranslations(ctx)),
    ...(await serverSideStructuredReportTranslations(ctx, ["gfr", "graphics"])),
    ...(await serverSideReduxState({})),
  },
})
