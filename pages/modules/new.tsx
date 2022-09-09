import { ReactElement } from "react"
import { gSSP } from "app/blitz-server"
import { MainLayout } from "app/core/components/common/MainLayout"
import { PageHead } from "app/core/components/common/PageHead"
import { NewModule } from "app/core/components/modules/NewModule"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { PageWithLayout } from "app/core/types"
import { serverSideInitialPublicData } from "app/core/utils/serverSideInitialPublicData"
import { serverSideReduxState } from "app/core/utils/serverSideReduxState"
import { serverSideSiteTranslations } from "app/core/utils/serverSideSiteTranslations"

const NewModulePage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("NewModulePage.pageTitle")} />
      <NewModule />
    </>
  )
}

NewModulePage.getLayout = (page: ReactElement) => <MainLayout size="md">{page}</MainLayout>

export default NewModulePage

export const getServerSideProps = gSSP(async (ctx) => ({
  props: {
    ...(await serverSideInitialPublicData(ctx)),
    ...(await serverSideSiteTranslations(ctx, ["editor"])),
    ...serverSideReduxState({}),
  },
}))
