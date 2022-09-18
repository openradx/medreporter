import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { PageHead } from "app/core/components/common/PageHead"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { MainLayout } from "../../app/core/components/common/MainLayout"
import { PageWithLayout } from "../../app/core/types"
import { serverSideInitialPublicData } from "../../app/core/utils/serverSideInitialPublicData"
import { serverSideReduxState } from "../../app/core/utils/serverSideReduxState"
import { serverSideSiteTranslations } from "../../app/core/utils/serverSideSiteTranslations"
import { serverSideStructuredReportTranslations } from "../../app/core/utils/serverSideStructuredReportTranslations"
import { AdrenalMri } from "../../app/tools/adrenalMri/components/AdrenalMri"

const AdrenalMriPage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("AdrenalMriPage.toolTitle")} />
      <AdrenalMri />
    </>
  )
}

AdrenalMriPage.getLayout = (page: ReactElement) => <MainLayout size="full">{page}</MainLayout>

export default AdrenalMriPage

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await serverSideInitialPublicData(ctx)),
    ...(await serverSideSiteTranslations(ctx)),
    ...(await serverSideStructuredReportTranslations(ctx, ["adrenalMri"])),
    ...serverSideReduxState({}),
  },
})
