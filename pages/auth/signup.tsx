import { Routes } from "@blitzjs/next"
import { Container } from "@mantine/core"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import { SignupForm } from "../../app/auth/components/SignupForm"
import { MainLayout } from "../../app/core/components/common/MainLayout"
import { NextPageWithLayout } from "../../app/core/types"
import { serverSideSiteTranslations } from "../../app/core/utils/serverSideSiteTranslations"

const SignupPage: NextPageWithLayout = () => {
  const router = useRouter()

  return (
    <Container size="sm">
      <SignupForm onSuccess={() => router.push(Routes.HomePage())} />
    </Container>
  )
}

SignupPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default SignupPage

export const getStaticProps: GetServerSideProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideSiteTranslations(locale!, locales!)),
  },
})
