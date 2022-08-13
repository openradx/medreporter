import { Container } from "@mantine/core"
import { GetServerSideProps } from "next"
import { ResetPasswordForm } from "../../app/auth/components/ResetPasswordForm"
import { MainLayout } from "../../app/core/components/common/MainLayout"
import { PageWithLayout } from "../../app/core/types"
import { serverSideInitialPublicData } from "../../app/core/utils/serverSideInitialPublicData"
import { serverSideSiteTranslations } from "../../app/core/utils/serverSideSiteTranslations"

const ResetPasswordPage: PageWithLayout = () => (
  <Container size="sm">
    <ResetPasswordForm />
  </Container>
)

ResetPasswordPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await serverSideInitialPublicData(ctx)),
    ...(await serverSideSiteTranslations(ctx)),
  },
})

export default ResetPasswordPage
