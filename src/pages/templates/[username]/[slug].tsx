import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
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
    i18nSite: await getServerSideSiteTranslations(locale, locales, ["template"]),
    preloadedReduxState: {},
  },
})

const TemplatePage: PageWithLayout = () => {
  const router = useRouter()
  const username = router.query.username as string
  const slug = router.query.slug as string
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("AdrenalMriPage.toolTitle")} />
      <div>
        {username} - {slug}
      </div>
    </>
  )
}

TemplatePage.getLayout = (page: ReactElement) => (
  <MainLayout size="full" footerSize="small">
    {page}
  </MainLayout>
)

export default TemplatePage
