import { UserRole } from "@prisma/client"
import { GetServerSideProps } from "next"
import { route } from "nextjs-routes"
import { InstitutesManager } from "~/components/admin/InstitutesManager"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { PageWithLayout, ServerSideProps } from "~/types"
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

const ManageInstitutesPage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("ManageInstitutesPage.formTitle")} />
      <InstitutesManager />
    </>
  )
}

ManageInstitutesPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default ManageInstitutesPage
