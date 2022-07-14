import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "../../app/core/components/common/MainLayout"
import { Tools } from "../../app/core/components/tools/Tools"
import { NextPageWithLayout } from "../../app/core/types"
import { serverSideSiteTranslations } from "../../app/core/utils/serverSideSiteTranslations"

const ToolsPage: NextPageWithLayout = () => <Tools />

ToolsPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default ToolsPage

export const getServerSideProps: GetServerSideProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideSiteTranslations(locale!, locales!, ["tools"])),
  },
})
