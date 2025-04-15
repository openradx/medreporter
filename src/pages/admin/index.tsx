import { UserRole } from "@prisma/client"
import { fromNodeHeaders } from "better-auth/node"
import { GetServerSideProps } from "next"
import { AdminFeatures } from "~/components/admin/AdminFeatures"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { auth } from "~/server/auth"
import { getServerSideSiteTranslations } from "~/server/utils/siteTranslations"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { hasRole } from "~/utils/authorization"
import { redirectToLogin } from "~/utils/redirects"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  locale,
  locales,
}) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })
  if (!session || !hasRole(session.user, [UserRole.SUPERUSER, UserRole.ORGANIZER])) {
    return redirectToLogin(locale)
  }

  return {
    props: {
      session,
      i18nSite: await getServerSideSiteTranslations(locale, locales, ["admin"]),
    },
  }
}

const AdminPage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("AdminPage.pageTitle")} />
      <AdminFeatures />
    </>
  )
}

AdminPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default AdminPage
