import { useLingui } from "@lingui/react/macro"
import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { NewTemplate } from "~/components/designer/NewTemplate"
import { getServerSideSession } from "~/server/utils/sessionUtils"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { loadSiteTranslation } from "~/utils/i18n"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  res,
  locale,
}) => ({
  props: {
    session: await getServerSideSession(req, res),
    translation: await loadSiteTranslation(locale),
    preloadedReduxState: {},
  },
})

const NewTemplatePage: PageWithLayout = () => {
  const { t } = useLingui()

  return (
    <>
      <PageHead title={t`Create new template`} />
      <NewTemplate />
    </>
  )
}

NewTemplatePage.getLayout = (page: ReactElement) => (
  <MainLayout size="full" footerSize="small">
    {page}
  </MainLayout>
)

export default NewTemplatePage
