import { useLingui } from "@lingui/react/macro"
import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { Fleischner2017 } from "~/default-templates/fleischner2017/Fleischner2017"
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

const Fleischner2017Page: PageWithLayout = () => {
  const { t } = useLingui()

  return (
    <>
      <PageHead title={t`Fleischner 2017`} />
      <Fleischner2017 />
    </>
  )
}

Fleischner2017Page.getLayout = (page: ReactElement) => (
  <MainLayout size="full" footerSize="small">
    {page}
  </MainLayout>
)

export default Fleischner2017Page
