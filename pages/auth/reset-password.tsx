import { GetServerSideProps } from "next"
import { ResetPasswordForm } from "app/auth/components/ResetPasswordForm"
import { MainLayout } from "app/core/components/common/MainLayout"
import { PageHead } from "app/core/components/common/PageHead"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { PageWithLayout } from "app/core/types"
import { serverSideInitialPublicData } from "app/core/utils/serverSideInitialPublicData"
import { serverSideSiteTranslations } from "app/core/utils/serverSideSiteTranslations"

const ResetPasswordPage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("ResetPasswordPage.pageTitle")} />
      <ResetPasswordForm />
    </>
  )
}

ResetPasswordPage.getLayout = (page) => <MainLayout size="sm">{page}</MainLayout>

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await serverSideInitialPublicData(ctx)),
    ...(await serverSideSiteTranslations(ctx)),
  },
})

export default ResetPasswordPage
