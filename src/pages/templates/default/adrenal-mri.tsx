import { useLingui } from "@lingui/react/macro"
import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { AdrenalMri } from "~/default-templates/adrenalMri/AdrenalMri"
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

const AdrenalMriPage: PageWithLayout = () => {
  const { t } = useLingui()

  return (
    <>
      <PageHead title={t`Adrenal MRI`} />
      <AdrenalMri />
    </>
  )
}

AdrenalMriPage.getLayout = (page: ReactElement) => (
  <MainLayout size="full" footerSize="small">
    {page}
  </MainLayout>
)

export default AdrenalMriPage
