import { fromNodeHeaders } from "better-auth/node"
import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { ForgotPasswordForm } from "~/components/auth/ForgotPasswordForm"
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
