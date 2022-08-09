import { Container } from "@mantine/core"
import { GetServerSideProps } from "next"
import { ResetPasswordForm } from "../../app/auth/components/ResetPasswordForm"
import { MainLayout } from "../../app/core/components/common/MainLayout"
import { PageWithLayout } from "../../app/core/types"
import { serverSideSiteTranslations } from "../../app/core/utils/serverSideSiteTranslations"

const ResetPasswordPage: PageWithLayout = () => (
  <Container size="sm">
    <ResetPasswordForm />
  </Container>
)

ResetPasswordPage.redirectAuthenticatedTo = "/"

ResetPasswordPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export const getStaticProps: GetServerSideProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideSiteTranslations(locale!, locales!)),
  },
})

export default ResetPasswordPage
