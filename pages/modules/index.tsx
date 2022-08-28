import { Container } from "@mantine/core"
import { gSSP } from "app/blitz-server"
import { MainLayout } from "app/core/components/common/MainLayout"
import { PageHead } from "app/core/components/common/PageHead"
import { ModuleListWithTags } from "app/core/components/modules/ModuleListWithTags"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { PageWithLayout } from "app/core/types"
import { serverSideInitialPublicData } from "app/core/utils/serverSideInitialPublicData"
import { serverSideSiteTranslations } from "app/core/utils/serverSideSiteTranslations"

const ModulesPage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("ModulesPage.title")} />
      <Container size="md">
        <ModuleListWithTags />
      </Container>
    </>
  )
}

ModulesPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export const getServerSideProps = gSSP(async (ctx) => ({
  props: {
    ...(await serverSideInitialPublicData(ctx)),
    ...(await serverSideSiteTranslations(ctx)),
  },
}))

export default ModulesPage
