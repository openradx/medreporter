import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "../../components/common/MainLayout"
import { AdrenalWashout } from "../../components/tools/adrenalWashout/AdrenalWashout"
import { NextPageWithLayout } from "../../types"
import { serverSideReduxState } from "../../utils/serverSideReduxState"
import { serverSideSiteTranslations } from "../../utils/serverSideSiteTranslations"
import { serverSideStructuredReportTranslations } from "../../utils/serverSideStructuredReportTranslations"

const AdrenalWashoutPage: NextPageWithLayout = () => <AdrenalWashout />

AdrenalWashoutPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default AdrenalWashoutPage

export const getServerSideProps: GetServerSideProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideSiteTranslations(locale!, locales!)),
    ...(await serverSideStructuredReportTranslations(locale!, locale!, locales!, [
      "adrenalWashout",
    ])),
    ...(await serverSideReduxState({})),
  },
})
