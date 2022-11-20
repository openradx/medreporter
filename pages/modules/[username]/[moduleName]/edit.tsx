import { ReactElement } from "react"
import { gSSP } from "app/blitz-server"
import { MainLayout } from "app/core/components/common/MainLayout"
import { PageHead } from "app/core/components/common/PageHead"
import { Editor } from "app/core/components/editor/Editor"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import getModule from "app/core/queries/getModuleByName"
import { PageWithLayout } from "app/core/types"
import { serverSideInitialPublicData } from "app/core/utils/serverSideInitialPublicData"
import { serverSideReduxState } from "app/core/utils/serverSideReduxState"
import { serverSideSiteTranslations } from "app/core/utils/serverSideSiteTranslations"

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

export const getServerSideProps = gSSP(async (ctx) => {
  const username = ctx.params?.username as string
  const moduleName = ctx.params?.moduleName as string

  const module_ = await getModule({ username, moduleName }, ctx.ctx)

  return {
    props: {
      ...(await serverSideInitialPublicData(ctx)),
      ...(await serverSideSiteTranslations(ctx, ["editor"])),
      ...serverSideReduxState({
        editor: {
          type: "module",
          id: module_.id,
          code: module_.code,
        },
      }),
    },
  }
})
