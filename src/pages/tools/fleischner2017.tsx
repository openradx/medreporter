import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "../../components/common/MainLayout"
import { Fleischner2017 } from "../../components/tools/fleischner2017"
import { NextPageWithLayout } from "../../types"
import { serverSideReduxState } from "../../utils/serverSideReduxState"
import { serverSideSiteTranslations } from "../../utils/serverSideSiteTranslations"

const Fleischner2017Page: NextPageWithLayout = () => <Fleischner2017 />

Fleischner2017Page.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default Fleischner2017Page

export const getServerSideProps: GetServerSideProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideSiteTranslations(locale!, locales!)),
    ...(await serverSideReduxState({})),
  },
})
