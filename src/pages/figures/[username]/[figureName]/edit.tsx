import { GetServerSideProps } from "next"
import { route } from "nextjs-routes"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { FigureEditor } from "~/components/editor/FigureEditor"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { commonRouter } from "~/server/routers/common"
import { setEditorState } from "~/state/editorSlice"
import { addFigure } from "~/state/figuresSlice"
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
  const user = session?.user

  if (!user) {
    return {
      redirect: {
        destination: route({ pathname: "/auth/login" }),
        permanent: false,
      },
    }
  }

  const username = params?.username as string
  const figureName = params?.figureName as string

  const caller = commonRouter.createCaller({ user })
  const figure = await caller.getFigure({ username, figureName })

  const store = initStore()
  const { author, ...rest } = figure
  store.dispatch(addFigure({ ...rest, author: author.username! }))
  store.dispatch(
    setEditorState({ resourceType: "figure", resourceName: figure.name, compileStatus: "ready" })
  )

  return {
    props: {
      session,
      i18nSite: await getServerSideSiteTranslations(locale, locales, ["editor"]),
      preloadedReduxState: store.getState(),
    },
  }
}

const EditFigurePage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("EditFigurePage.pageTitle")} />
      <FigureEditor />
    </>
  )
}

EditFigurePage.getLayout = (page: ReactElement) => <MainLayout size="full">{page}</MainLayout>

export default EditFigurePage