import { ReactElement } from "react"
import { gSSP } from "app/blitz-server"
import { MainLayout } from "app/core/components/common/MainLayout"
import { Editor } from "app/core/components/editor/Editor"
import { PageWithLayout } from "app/core/types"
import { serverSideInitialPublicData } from "app/core/utils/serverSideInitialPublicData"
import { serverSideReduxState } from "app/core/utils/serverSideReduxState"
import { serverSideSiteTranslations } from "app/core/utils/serverSideSiteTranslations"

const NewModulePage: PageWithLayout = () => <Editor />

NewModulePage.getLayout = (page: ReactElement) => <MainLayout fullScreen>{page}</MainLayout>

export default NewModulePage

export const getServerSideProps = gSSP(async (ctx) => ({
  props: {
    ...(await serverSideInitialPublicData(ctx)),
    ...(await serverSideSiteTranslations(ctx, ["editor"])),
    ...(await serverSideReduxState({})),
  },
}))
