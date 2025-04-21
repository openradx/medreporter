import { useLingui } from "@lingui/react/macro"
import { UserRole } from "@prisma/client"
import { GetServerSideProps } from "next"
import { AdminFeatures } from "~/components/admin/AdminFeatures"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { getServerSideSession } from "~/server/utils/sessionUtils"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { hasRole } from "~/utils/authorization"
import { loadSiteTranslation } from "~/utils/i18n"
import { redirectToLogin } from "~/utils/redirects"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  res,
  locale,
}) => {
  const session = await getServerSideSession(req, res)
  const user = session?.user

  if (!user || !hasRole(user, [UserRole.SUPERUSER, UserRole.ORGANIZER])) {
    return redirectToLogin(locale)
  }

  return {
    props: {
      session,
      translation: await loadSiteTranslation(locale),
    },
  }
}

const AdminPage: PageWithLayout = () => {
  const { t } = useLingui()

  return (
    <>
      <PageHead title={t`Administration`} />
      <AdminFeatures />
    </>
  )
}

AdminPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default AdminPage
