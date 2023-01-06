import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { PageWithLayout, ServerSideProps } from "~/types"
import { getServerSideSession } from "~/utils/serverSideSession"
import { getServerSideSiteTranslations } from "~/utils/serverSideSiteTranslations"

export const getServerSideProps: GetServerSideProps = async ({ req, res, locale, locales }) => {
  const props: ServerSideProps = {
    session: await getServerSideSession(req, res),
    i18nSite: await getServerSideSiteTranslations(locale, locales),
  }
  return { props }
}

const ShowModulePage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("ShowModulePage.pageTitle")} />
      <span>Show Module</span>
    </>
  )
}

ShowModulePage.getLayout = (page: ReactElement) => <MainLayout size="md">{page}</MainLayout>

export default ShowModulePage
