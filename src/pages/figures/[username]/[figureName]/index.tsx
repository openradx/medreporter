import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { ShowFigure } from "~/components/figures/ShowFigure"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { resourcesRouter } from "~/server/routers/resources"
import { getServerSideSession } from "~/server/utils/sessionUtils"
import { getServerSideSiteTranslations } from "~/server/utils/siteTranslations"
import { addResource } from "~/state/resourcesSlice"
import { initStore } from "~/state/store"
import { PageWithLayout, ServerSideProps } from "~/types/general"

interface PageProps extends ServerSideProps {
  resourceId: string
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
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
  const resource = await caller.getResource({ type: "FIGURE", author: username, name: figureName })

  const store = initStore()
  const { createdAt, updatedAt, ...rest } = resource
  store.dispatch(
    addResource({ ...rest, createdAt: createdAt.toISOString(), updatedAt: updatedAt.toISOString() })
  )

  return {
    props: {
      session: await getServerSideSession(req, res),
      i18nSite: await getServerSideSiteTranslations(locale, locales),
      preloadedReduxState: store.getState(),
      resourceId: resource.id,
    },
  }
}

const ShowFigurePage: PageWithLayout<PageProps> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { t } = useSiteTranslation()
  const figureId = props.resourceId

  return (
    <>
      <PageHead title={t("ShowFigurePage.pageTitle")} />
      <ShowFigure resourceId={figureId} />
    </>
  )
}

ShowFigurePage.getLayout = (page: ReactElement) => <MainLayout size="md">{page}</MainLayout>

export default ShowFigurePage
