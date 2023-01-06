import { GetServerSideProps } from "next"
import { route } from "nextjs-routes"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { Editor } from "~/components/editor/Editor"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { commonRouter } from "~/server/routers/common"
import { PageWithLayout, ServerSideProps } from "~/types"
import { getServerSideSession } from "~/utils/serverSideSession"
import { getServerSideSiteTranslations } from "~/utils/serverSideSiteTranslations"

export const getServerSideProps: GetServerSideProps = async ({
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

  const caller = commonRouter.createCaller({ user })
  const module_ = await caller.getModule({ username, moduleName })

  const props: ServerSideProps = {
    session,
    i18nSite: await getServerSideSiteTranslations(locale, locales, ["editor"]),
    preloadedReduxState: {
      editor: {
        type: "module",
        id: module_.id,
        source: module_.source,
      },
    },
  }
  return { props }
}

const EditModulePage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("EditModulePage.pageTitle")} />
      <Editor />
    </>
  )
}

EditModulePage.getLayout = (page: ReactElement) => <MainLayout size="full">{page}</MainLayout>

export default EditModulePage
