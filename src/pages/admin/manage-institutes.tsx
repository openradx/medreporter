import { useLingui } from "@lingui/react/macro"
import { UserRole } from "@prisma/client"
import { GetServerSideProps } from "next"
import { InstitutesManager } from "~/components/admin/InstitutesManager"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { getServerSideSession } from "~/server/utils/sessionUtils"
import { getServerSideSiteTranslations } from "~/server/utils/siteTranslations"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { hasRole } from "~/utils/authorization"
import { redirectToLogin } from "~/utils/redirects"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  res,
  locale,
  locales,
}) => {
  const session = await getServerSideSession(req, res)
  const user = session?.user

  if (!user || !hasRole(user, [UserRole.SUPERUSER, UserRole.ORGANIZER])) {
    return redirectToLogin(locale)
  }

  return {
    props: {
      session,
      i18nSite: await getServerSideSiteTranslations(locale, locales, ["admin"]),
    },
  }
}

const ManageInstitutesPage: PageWithLayout = () => {
  const { t } = useLingui()

  return (
    <>
      <PageHead title={t`Manage institutes`} />
      <InstitutesManager />
    </>
  )
}

ManageInstitutesPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default ManageInstitutesPage
