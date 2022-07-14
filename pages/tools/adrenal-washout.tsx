import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { StructuredReportLayout } from "../../app/core/components/common/StructuredReportLayout"
import { NextPageWithLayout } from "../../app/core/types"
import { serverSideReduxState } from "../../app/core/utils/serverSideReduxState"
import { serverSideSiteTranslations } from "../../app/core/utils/serverSideSiteTranslations"
import { serverSideStructuredReportTranslations } from "../../app/core/utils/serverSideStructuredReportTranslations"
import { AdrenalWashout } from "../../app/tools/adrenalWashout/components/AdrenalWashout"

const AdrenalWashoutPage: NextPageWithLayout = () => <AdrenalWashout />

AdrenalWashoutPage.getLayout = (page: ReactElement) => (
  <StructuredReportLayout>{page}</StructuredReportLayout>
)

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
