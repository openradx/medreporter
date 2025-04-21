import { useLingui } from "@lingui/react/macro"
import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { AdrenalWashout } from "~/default-templates/adrenalWashout/AdrenalWashout"
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

const AdrenalWashoutPage: PageWithLayout = () => {
  const { t } = useLingui()

  return (
    <>
      <PageHead title={t`Adrenal Washout on CT`} />
      <AdrenalWashout />
    </>
  )
}

AdrenalWashoutPage.getLayout = (page: ReactElement) => (
  <MainLayout size="full" footerSize="small">
    {page}
  </MainLayout>
)

export default AdrenalWashoutPage
