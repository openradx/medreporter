import { GetServerSideProps } from "next"
import { ResetPasswordForm } from "~/components/auth/ResetPasswordForm"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { PageWithLayout, ServerSideProps } from "~/types"
import { getServerSideSession } from "~/utils/serverSideSession"
import { getServerSideSiteTranslations } from "~/utils/serverSideSiteTranslations"

export const getServerSideProps: GetServerSideProps = async ({ req, res, locale, locales }) => {
  const props: ServerSideProps = {
    session: await getServerSideSession(req, res),
    i18nSite: await getServerSideSiteTranslations(locale, locales),
  }
  return { props }
}

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

export default ResetPasswordPage
