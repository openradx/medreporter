import { ReactElement } from "react"
import { MainLayout } from "../../components/common/MainLayout"
import { NextPageWithLayout } from "../../types"

const ToolsPage: NextPageWithLayout = () => <div>Tools</div>

ToolsPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default ToolsPage
