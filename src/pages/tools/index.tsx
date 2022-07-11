import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "../../components/common/MainLayout"
import { Tools } from "../../components/tools/Tools"
import { NextPageWithLayout } from "../../types"
import { serverSideSiteTranslations } from "../../utils/serverSideSiteTranslations"

const ToolsPage: NextPageWithLayout = () => <Tools />

ToolsPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default ToolsPage

export const getServerSideProps: GetServerSideProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideSiteTranslations(locale!, locales!, ["tools"])),
  },
})
