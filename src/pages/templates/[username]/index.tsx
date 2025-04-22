import { fromNodeHeaders } from "better-auth/node"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { auth } from "~/server/auth"
import { getServerSideSiteTranslations } from "~/server/utils/siteTranslations"
import { PageWithLayout, ServerSideProps } from "~/types/general"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  locale,
  locales,
}) => ({
  props: {
    session: await auth.api.getSession({ headers: fromNodeHeaders(req.headers) }),
    i18nSite: await getServerSideSiteTranslations(locale, locales, ["template"]),
    preloadedReduxState: {},
  },
})

const TemplatesOfUserPage: PageWithLayout = () => {
  const router = useRouter()
  const username = router.query.username as string

  // TODO: Implement the templates of user page and add a title
  return (
    <>
      <PageHead title="" />
      <div>{username}</div>
    </>
  )
}

TemplatesOfUserPage.getLayout = (page: ReactElement) => (
  <MainLayout size="full" footerSize="small">
    {page}
  </MainLayout>
)

export default TemplatesOfUserPage
