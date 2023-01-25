import { GetServerSideProps } from "next"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { ModuleListWithCategories } from "~/components/modules/ModuleListWithCategories"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { getServerSideSession } from "~/utils/serverSideSession"
import { getServerSideSiteTranslations } from "~/utils/serverSideSiteTranslations"

export const getServerSideProps: GetServerSideProps = async ({ req, res, locale, locales }) => {
  const props: ServerSideProps = {
    session: await getServerSideSession(req, res),
    i18nSite: await getServerSideSiteTranslations(locale, locales),
  }
  return { props }
}

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
