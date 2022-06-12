import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "../components/common/MainLayout"
import { Welcome } from "../components/home/Welcome"
import { NextPageWithLayout } from "../types"
import { serverSideSiteTranslations } from "../utils/serverSideSiteTranslations"

const HomePage: NextPageWithLayout = () => <Welcome />

HomePage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default HomePage

export const getServerSideProps: GetServerSideProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideSiteTranslations(locale!, locales!)),
  },
})
