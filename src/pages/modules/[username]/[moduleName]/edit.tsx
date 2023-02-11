import { GetServerSideProps } from "next"
import { route } from "nextjs-routes"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { ModuleEditor } from "~/components/editor/ModuleEditor"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { resourcesRouter } from "~/server/routers/resources"
import { setEditorState } from "~/state/editorSlice"
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
  const moduleName = params?.moduleName as string

  const caller = resourcesRouter.createCaller({ user })
  const module_ = await caller.getResource({ type: "MODULE", author: username, name: moduleName })

  const store = initStore()
  const { author, ...rest } = module_
  store.dispatch(addResource({ ...rest, author: author.username! }))
  store.dispatch(
    setEditorState({ resourceType: "module", resourceName: module_.name, compileStatus: "ready" })
  )

  return {
    props: {
      session,
      i18nSite: await getServerSideSiteTranslations(locale, locales, ["editor"]),
      preloadedReduxState: store.getState(),
    },
  }
}

const EditModulePage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("EditModulePage.pageTitle")} />
      <ModuleEditor />
    </>
  )
}

EditModulePage.getLayout = (page: ReactElement) => <MainLayout size="full">{page}</MainLayout>

export default EditModulePage
