import { GetServerSideProps } from "next"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { ModuleListWithCategories } from "~/components/modules/ModuleListWithCategories"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
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

const ModulesPage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("ModulesPage.title")} />
      <ModuleListWithCategories />
    </>
  )
}

ModulesPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default ModulesPage
