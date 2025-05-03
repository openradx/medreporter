import { Trans } from "@lingui/react/macro"
import { Text, Title } from "@mantine/core"
import { GetStaticProps } from "next"
import Link from "next/link"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { PageWithLayout, StaticProps } from "~/types/general"
import { loadSiteTranslation } from "~/utils/i18n"

export const getStaticProps: GetStaticProps<StaticProps> = async ({ locale }) => ({
  props: {
    translation: await loadSiteTranslation(locale),
  },
})

const Custom404: PageWithLayout = () => (
  <>
    <PageHead title="404" />
    <Title ta="center" mt={100}>
      <Text inherit variant="gradient" span>
        404
      </Text>
      <Trans> - Page Not Found</Trans>
      <Link href="/" style={{ textDecoration: "none" }}>
        <Text fz="md" c="blue">
          <Trans>Go back to homepage</Trans>
        </Text>
      </Link>
    </Title>
  </>
)

Custom404.getLayout = (page) => <MainLayout withoutAccountControl>{page}</MainLayout>

export default Custom404
