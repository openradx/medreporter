import { Container } from "@mantine/core"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import { LoginForm } from "../../app/auth/components/LoginForm"
import { MainLayout } from "../../app/core/components/common/MainLayout"
import { NextPageWithLayout } from "../../app/core/types"
import { serverSideSiteTranslations } from "../../app/core/utils/serverSideSiteTranslations"

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter()

  return (
    <Container size="sm">
      <LoginForm
        onSuccess={() => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          router.push(next)
        }}
      />
    </Container>
  )
}

LoginPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default LoginPage

export const getStaticProps: GetServerSideProps = async ({ locale, locales }) => ({
  props: {
    ...(await serverSideSiteTranslations(locale!, locales!)),
  },
})
