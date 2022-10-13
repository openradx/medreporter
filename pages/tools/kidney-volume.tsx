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
import { KidneyVolume } from "../../app/tools/kidneyVolume/components/KidneyVolume"

const KidneyVolumePage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("KidneyVolumePage.toolTitle")} />
      <KidneyVolume />
    </>
  )
}

KidneyVolumePage.getLayout = (page: ReactElement) => <MainLayout size="full">{page}</MainLayout>

export default KidneyVolumePage

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await serverSideInitialPublicData(ctx)),
    ...(await serverSideSiteTranslations(ctx)),
    ...(await serverSideStructuredReportTranslations(ctx, ["kidneyVolume"])),
    ...serverSideReduxState({}),
  },
})
