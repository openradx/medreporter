import { GetServerSideProps } from "next"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { Templates } from "~/components/templates/Templates"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { getServerSideSession } from "~/server/utils/sessionUtils"
import { getServerSideSiteTranslations } from "~/server/utils/siteTranslations"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { redirectToLogin } from "~/utils/redirects"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  res,
  locale,
  locales,
}) => {
  const session = await getServerSideSession(req, res)
  const user = session?.user

  if (!user) {
    return redirectToLogin(locale)
  }

  return {
    props: {
      session,
      i18nSite: await getServerSideSiteTranslations(locale, locales, ["categories"]),
    },
  }
}

const TemplatesPage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("TemplatesPage.pageTitle")} />
      <Templates />
    </>
  )
}

TemplatesPage.getLayout = (page) => <MainLayout size="full">{page}</MainLayout>

export default TemplatesPage
