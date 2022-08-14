import { Container } from "@mantine/core"
import { InstitutesManager } from "app/admin/components/InstitutesManager"
import { gSSP } from "app/blitz-server"
import { MainLayout } from "app/core/components/common/MainLayout"
import { PageWithLayout } from "app/core/types"
import { serverSideInitialPublicData } from "app/core/utils/serverSideInitialPublicData"
import { serverSideSiteTranslations } from "app/core/utils/serverSideSiteTranslations"

const ManageInstitutesPage: PageWithLayout = () => (
  <Container size="md">
    <InstitutesManager />
  </Container>
)

ManageInstitutesPage.authenticate = true

ManageInstitutesPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export const getServerSideProps = gSSP(async (ctx) => ({
  props: {
    ...(await serverSideInitialPublicData(ctx)),
    ...(await serverSideSiteTranslations(ctx)),
  },
}))

export default ManageInstitutesPage
