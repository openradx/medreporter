import { ReactElement } from "react"
import { PageHead } from "app/core/components/common/PageHead"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { gSSP } from "../app/blitz-server"
import { MainLayout } from "../app/core/components/common/MainLayout"
import { Welcome } from "../app/core/components/home/Welcome"
import { PageWithLayout } from "../app/core/types"
import { serverSideInitialPublicData } from "../app/core/utils/serverSideInitialPublicData"
import { serverSideSiteTranslations } from "../app/core/utils/serverSideSiteTranslations"

const HomePage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("HomePage.page_title")} />
      <Welcome />
    </>
  )
}

HomePage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default HomePage

export const getServerSideProps = gSSP(async (ctx) => ({
  props: {
    ...(await serverSideInitialPublicData(ctx)),
    ...(await serverSideSiteTranslations(ctx)),
  },
}))
