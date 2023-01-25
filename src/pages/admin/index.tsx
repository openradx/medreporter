import { UserRole } from "@prisma/client"
import { GetServerSideProps } from "next"
import { route } from "nextjs-routes"
import { AdminFeatures } from "~/components/admin/AdminFeatures"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { hasRole } from "~/utils/authorization"
import { getServerSideSession } from "~/utils/serverSideSession"
import { getServerSideSiteTranslations } from "~/utils/serverSideSiteTranslations"

export const getServerSideProps: GetServerSideProps = async ({ req, res, locale, locales }) => {
  const session = await getServerSideSession(req, res)
  const user = session?.user

  if (!user || !hasRole(user, [UserRole.SUPERADMIN, UserRole.ORGANIZER])) {
    return {
      redirect: {
        destination: route({ pathname: "/auth/login" }),
        permanent: false,
      },
    }
  }

  const props: ServerSideProps = {
    session,
    i18nSite: await getServerSideSiteTranslations(locale, locales, ["admin"]),
  }
  return { props }
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
