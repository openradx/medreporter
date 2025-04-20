import { useLingui } from "@lingui/react/macro"
import { GetServerSideProps } from "next"
import { ResetPasswordForm } from "~/components/auth/ResetPasswordForm"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
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

const ResetPasswordPage: PageWithLayout = () => {
  const { t } = useLingui()

  return (
    <>
      <PageHead title={t`Reset password`} />
      <ResetPasswordForm />
    </>
  )
}

ResetPasswordPage.getLayout = (page) => <MainLayout size="sm">{page}</MainLayout>

export default ResetPasswordPage
