import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { StructuredReportLayout } from "../../components/common/StructuredReportLayout"
import { MeasurementsTable } from "../../components/tools/measurements/MeasurementsTable"
import { NextPageWithLayout } from "../../types"
import { serverSideReduxState } from "../../utils/serverSideReduxState"
import { serverSideSiteTranslations } from "../../utils/serverSideSiteTranslations"
import { serverSideStructuredReportTranslations } from "../../utils/serverSideStructuredReportTranslations"

const MeasurementsTablePage: NextPageWithLayout = () => <MeasurementsTable />

MeasurementsTablePage.getLayout = (page: ReactElement) => (
  <StructuredReportLayout>{page}</StructuredReportLayout>
)

export default MeasurementsTablePage

export const getServerSideProps: GetServerSideProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideSiteTranslations(locale!, locales!)),
    ...(await serverSideStructuredReportTranslations(locale!, locale!, locales!, [
      "measurementsTable",
    ])),
    ...(await serverSideReduxState({})),
  },
})
