import { ReactElement } from "react"
import { gSSP } from "app/blitz-server"
import { MainLayout } from "app/core/components/common/MainLayout"
import { PageHead } from "app/core/components/common/PageHead"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { PageWithLayout } from "app/core/types"
import { serverSideInitialPublicData } from "app/core/utils/serverSideInitialPublicData"
import { serverSideSiteTranslations } from "app/core/utils/serverSideSiteTranslations"

const ShowModulePage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("ShowModulePage.pageTitle")} />
      <span>Show Module</span>
    </>
  )
}

ShowModulePage.getLayout = (page: ReactElement) => <MainLayout size="md">{page}</MainLayout>

export default ShowModulePage

export const getServerSideProps = gSSP(async (ctx) => ({
  props: {
    ...(await serverSideInitialPublicData(ctx)),
    ...(await serverSideSiteTranslations(ctx)),
  },
}))
