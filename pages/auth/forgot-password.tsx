import { Container } from "@mantine/core"
import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { ForgotPasswordForm } from "../../app/auth/components/ForgotPasswordForm"
import { MainLayout } from "../../app/core/components/common/MainLayout"
import { NextPageWithLayout } from "../../app/core/types"
import { serverSideSiteTranslations } from "../../app/core/utils/serverSideSiteTranslations"

const ForgotPasswordPage: NextPageWithLayout = () => (
  <Container size="sm">
    <ForgotPasswordForm />
  </Container>
)

ForgotPasswordPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default ForgotPasswordPage

export const getStaticProps: GetServerSideProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideSiteTranslations(locale!, locales!)),
  },
})
