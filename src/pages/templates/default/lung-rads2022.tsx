import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { getServerSideSession } from "~/server/utils/sessionUtils"
import { getServerSideSiteTranslations } from "~/server/utils/siteTranslations"
import { LungRads2022 } from "~/tools/lungRads2022/LungRads2022"
import { PageWithLayout, ServerSideProps } from "~/types/general"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  res,
  locale,
  locales,
}) => ({
  props: {
    session: await getServerSideSession(req, res),
    i18nSite: await getServerSideSiteTranslations(locale, locales, ["template"]),
    preloadedReduxState: {},
  },
})

const LungRads2022Page: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("LungRads2022Page.toolTitle")} />
      <LungRads2022 />
    </>
  )
}

LungRads2022Page.getLayout = (page: ReactElement) => (
  <MainLayout size="full" footerSize="small">
    {page}
  </MainLayout>
)

export default LungRads2022Page
