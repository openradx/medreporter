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
import { Fleischner2017 } from "../../app/tools/fleischner2017/components/Fleischner2017"

const Fleischner2017Page: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("Fleischner2017Page.title")} />
      <Fleischner2017 />
    </>
  )
}

Fleischner2017Page.getLayout = (page: ReactElement) => <MainLayout size="full">{page}</MainLayout>

export default Fleischner2017Page

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await serverSideInitialPublicData(ctx)),
    ...(await serverSideSiteTranslations(ctx)),
    ...(await serverSideStructuredReportTranslations(ctx, ["fleischner2017", "graphics"])),
    ...serverSideReduxState({}),
  },
})
