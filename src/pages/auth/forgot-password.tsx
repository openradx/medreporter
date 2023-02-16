import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { ForgotPasswordForm } from "~/components/auth/ForgotPasswordForm"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { getServerSideSession } from "~/server/utils/sessionUtils"
import { getServerSideSiteTranslations } from "~/server/utils/siteTranslations"
import { PageWithLayout, ServerSideProps } from "~/types/general"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  res,
  locale,
  locales,
}) => ({
  props: {
    session: await getServerSideSession(req, res),
    i18nSite: await getServerSideSiteTranslations(locale, locales),
  },
})

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
