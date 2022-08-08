import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "../../app/core/components/common/MainLayout"
import { NextPageWithLayout } from "../../app/core/types"
import { serverSideReduxState } from "../../app/core/utils/serverSideReduxState"
import { serverSideSiteTranslations } from "../../app/core/utils/serverSideSiteTranslations"
import { serverSideStructuredReportTranslations } from "../../app/core/utils/serverSideStructuredReportTranslations"
import { GFR } from "../../app/tools/GFR/components/GFR"

const GFRPage: NextPageWithLayout = () => <GFR />

GFRPage.getLayout = (page: ReactElement) => <MainLayout fullScreen>{page}</MainLayout>

export default GFRPage

export const getServerSideProps: GetServerSideProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideSiteTranslations(locale!, locales!)),
    ...(await serverSideStructuredReportTranslations(locale!, locale!, locales!, ["graphics"])),
    ...(await serverSideReduxState({})),
  },
})