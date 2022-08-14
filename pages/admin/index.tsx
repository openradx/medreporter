import { Container } from "@mantine/core"
import { AdminFeatures } from "app/admin/components/AdminFeatures"
import { gSSP } from "app/blitz-server"
import { MainLayout } from "app/core/components/common/MainLayout"
import { PageWithLayout } from "app/core/types"
import { serverSideInitialPublicData } from "app/core/utils/serverSideInitialPublicData"
import { serverSideSiteTranslations } from "app/core/utils/serverSideSiteTranslations"

const AdminPage: PageWithLayout = () => (
  <Container size="md">
    <AdminFeatures />
  </Container>
)

AdminPage.authenticate = true

AdminPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export const getServerSideProps = gSSP(async (ctx) => ({
  props: {
    ...(await serverSideInitialPublicData(ctx)),
    ...(await serverSideSiteTranslations(ctx, ["admin"])),
  },
}))

export default AdminPage
