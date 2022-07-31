import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "../../app/core/components/common/MainLayout"
import { Editor } from "../../app/core/components/editor/Editor"
import { NextPageWithLayout } from "../../app/core/types"
import { serverSideReduxState } from "../../app/core/utils/serverSideReduxState"
import { serverSideSiteTranslations } from "../../app/core/utils/serverSideSiteTranslations"

const NewModulePage: NextPageWithLayout = () => <Editor type="module" />

NewModulePage.getLayout = (page: ReactElement) => <MainLayout fullScreen>{page}</MainLayout>

export default NewModulePage

export const getServerSideProps: GetServerSideProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideSiteTranslations(locale!, locales!, ["editor"])),
    ...(await serverSideReduxState({})),
  },
})
