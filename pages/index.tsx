import { ReactElement } from "react"
import { gSSP } from "../app/blitz-server"
import { MainLayout } from "../app/core/components/common/MainLayout"
import { Welcome } from "../app/core/components/home/Welcome"
import { PageWithLayout } from "../app/core/types"
import { serverSideInitialPublicData } from "../app/core/utils/serverSideInitialPublicData"
import { serverSideSiteTranslations } from "../app/core/utils/serverSideSiteTranslations"

const HomePage: PageWithLayout = () => <Welcome />

HomePage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default HomePage

export const getServerSideProps = gSSP(async ({ req, res, locale, locales }) => ({
  props: {
    ...(await serverSideInitialPublicData(req, res)),
    ...(await serverSideSiteTranslations(locale!, locales!)),
  },
}))
