import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { NewTemplate } from "~/components/designer/NewTemplate"
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
    i18nSite: await getServerSideSiteTranslations(locale, locales, ["designer", "template"]),
    preloadedReduxState: {},
  },
})

const NewTemplatePage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("NewTemplatePage.pageTitle")} />
      <NewTemplate />
    </>
  )
}

NewTemplatePage.getLayout = (page: ReactElement) => (
  <MainLayout size="full" footerSize="small">
    {page}
  </MainLayout>
)

export default NewTemplatePage
