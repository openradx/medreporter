import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { StructuredReportLayout } from "../../app/core/components/common/StructuredReportLayout"
import { NextPageWithLayout } from "../../app/core/types"
import { serverSideReduxState } from "../../app/core/utils/serverSideReduxState"
import { serverSideSiteTranslations } from "../../app/core/utils/serverSideSiteTranslations"
import { serverSideStructuredReportTranslations } from "../../app/core/utils/serverSideStructuredReportTranslations"
import { Fleischner2017 } from "../../app/tools/fleischner2017/components/Fleischner2017"

const Fleischner2017Page: NextPageWithLayout = () => <Fleischner2017 />

Fleischner2017Page.getLayout = (page: ReactElement) => (
  <StructuredReportLayout>{page}</StructuredReportLayout>
)

export default Fleischner2017Page

export const getServerSideProps: GetServerSideProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideSiteTranslations(locale!, locales!)),
    ...(await serverSideStructuredReportTranslations(locale!, locale!, locales!, [
      "fleischner2017",
      "graphics",
    ])),
    ...(await serverSideReduxState({})),
  },
})