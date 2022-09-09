import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import { LoginForm } from "app/auth/components/LoginForm"
import { gSSP } from "app/blitz-server"
import { MainLayout } from "app/core/components/common/MainLayout"
import { PageHead } from "app/core/components/common/PageHead"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { PageWithLayout } from "app/core/types"
import { serverSideInitialPublicData } from "app/core/utils/serverSideInitialPublicData"
import { serverSideSiteTranslations } from "app/core/utils/serverSideSiteTranslations"

const LoginPage: PageWithLayout = () => {
  const { t } = useSiteTranslation()
  const router = useRouter()

  return (
    <>
      <PageHead title={t("LoginPage.title")} />
      <LoginForm
        onSuccess={() => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          router.push(next)
        }}
      />
    </>
  )
}

LoginPage.getLayout = (page: ReactElement) => <MainLayout size="sm">{page}</MainLayout>

export default LoginPage

export const getServerSideProps: GetServerSideProps = gSSP(async (ctx) => ({
  props: {
    ...(await serverSideInitialPublicData(ctx)),
    ...(await serverSideSiteTranslations(ctx)),
  },
}))
