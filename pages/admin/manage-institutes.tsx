import { InstitutesManager } from "app/admin/components/InstitutesManager"
import { gSSP } from "app/blitz-server"
import { MainLayout } from "app/core/components/common/MainLayout"
import { PageHead } from "app/core/components/common/PageHead"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { PageWithLayout } from "app/core/types"
import { serverSideInitialPublicData } from "app/core/utils/serverSideInitialPublicData"
import { serverSideSiteTranslations } from "app/core/utils/serverSideSiteTranslations"

const ManageInstitutesPage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("ManageInstitutesPage.formTitle")} />
      <InstitutesManager />
    </>
  )
}

ManageInstitutesPage.authenticate = true

ManageInstitutesPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export const getServerSideProps = gSSP(async (ctx) => ({
  props: {
    ...(await serverSideInitialPublicData(ctx)),
    ...(await serverSideSiteTranslations(ctx, ["admin"])),
  },
}))

export default ManageInstitutesPage
