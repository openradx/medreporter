import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { Tools } from "~/components/tools/Tools"
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
    i18nSite: await getServerSideSiteTranslations(locale, locales, ["tools"]),
  },
})

const ToolsPage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("ToolsPage.pageTitle")} />
      <Tools />
    </>
  )
}

ToolsPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default ToolsPage
