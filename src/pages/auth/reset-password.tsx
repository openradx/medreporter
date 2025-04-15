import { fromNodeHeaders } from "better-auth/node"
import { GetServerSideProps } from "next"
import { ResetPasswordForm } from "~/components/auth/ResetPasswordForm"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { auth } from "~/server/auth"
import { getServerSideSiteTranslations } from "~/server/utils/siteTranslations"
import { PageWithLayout, ServerSideProps } from "~/types/general"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  locale,
  locales,
}) => ({
  props: {
    session: await auth.api.getSession({ headers: fromNodeHeaders(req.headers) }),
    i18nSite: await getServerSideSiteTranslations(locale, locales),
  },
})

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
