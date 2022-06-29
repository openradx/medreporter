import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { StructuredReportLayout } from "../../components/common/StructuredReportLayout"
import { Fleischner2017 } from "../../components/tools/fleischner2017/Fleischner2017"
import { NextPageWithLayout } from "../../types"
import { serverSideReduxState } from "../../utils/serverSideReduxState"
import { serverSideSiteTranslations } from "../../utils/serverSideSiteTranslations"
import { serverSideStructuredReportTranslations } from "../../utils/serverSideStructuredReportTranslations"

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
