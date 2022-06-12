import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "../../components/common/MainLayout"
import { NextPageWithLayout } from "../../types"
import { serverSideSiteTranslations } from "../../utils/serverSideSiteTranslations"

const ToolsPage: NextPageWithLayout = () => <div>Tools</div>

ToolsPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default ToolsPage

export const getServerSideProps: GetServerSideProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideSiteTranslations(locale!, locales!)),
  },
})
