import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "../app/core/components/common/MainLayout"
import { Welcome } from "../app/core/components/home/Welcome"
import { NextPageWithLayout } from "../app/core/types"
import { serverSideSiteTranslations } from "../app/core/utils/serverSideSiteTranslations"

const HomePage: NextPageWithLayout = () => <Welcome />

HomePage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default HomePage

export const getServerSideProps: GetServerSideProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideSiteTranslations(locale!, locales!)),
  },
})
