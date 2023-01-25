import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { ForgotPasswordForm } from "~/components/auth/ForgotPasswordForm"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { getServerSideSession } from "~/utils/serverSideSession"
import { getServerSideSiteTranslations } from "~/utils/serverSideSiteTranslations"

export const getServerSideProps: GetServerSideProps = async ({ req, res, locale, locales }) => {
  const props: ServerSideProps = {
    session: await getServerSideSession(req, res),
    i18nSite: await getServerSideSiteTranslations(locale, locales),
  }
  return { props }
}

const ForgotPasswordPage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("ForgotPasswordPage.pageTitle")} />
      <ForgotPasswordForm />
    </>
  )
}

ForgotPasswordPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default ForgotPasswordPage
