import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { resourcesRouter } from "~/server/routers/resources"
import { addResource } from "~/state/resourcesSlice"
import { initStore } from "~/state/store"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { getServerSideSession } from "~/utils/serverSideSession"
import { getServerSideSiteTranslations } from "~/utils/serverSideSiteTranslations"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  res,
  locale,
  locales,
  params,
}) => {
  const session = await getServerSideSession(req, res)
  const user = session?.user ?? null

  const username = params?.username as string
  const figureName = params?.figureName as string

  const caller = resourcesRouter.createCaller({ user })
  const figure = await caller.getResource({ type: "FIGURE", author: username, name: figureName })

  const store = initStore()
  const { author, ...rest } = figure
  store.dispatch(addResource({ ...rest, author: author.username! }))

  return {
    props: {
      session: await getServerSideSession(req, res),
      i18nSite: await getServerSideSiteTranslations(locale, locales),
      preloadedReduxState: store.getState(),
    },
  }
}

const ShowFigurePage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("ShowFigurePage.pageTitle")} />
      <span>Show Figure</span>
    </>
  )
}

ShowFigurePage.getLayout = (page: ReactElement) => <MainLayout size="md">{page}</MainLayout>

export default ShowFigurePage
