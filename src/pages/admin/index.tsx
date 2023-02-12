import { UserRole } from "@prisma/client"
import { GetServerSideProps } from "next"
import { AdminFeatures } from "~/components/admin/AdminFeatures"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { hasRole } from "~/utils/authorization"
import { redirectToLogin } from "~/utils/serverSideRedirects"
import { getServerSideSession } from "~/utils/serverSideSession"
import { getServerSideSiteTranslations } from "~/utils/serverSideSiteTranslations"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  res,
  locale,
  locales,
}) => {
  const session = await getServerSideSession(req, res)
  const user = session?.user

  if (!user || !hasRole(user, [UserRole.SUPERADMIN, UserRole.ORGANIZER])) {
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
