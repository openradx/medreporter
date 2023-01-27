import { Text, Title } from "@mantine/core"
import { GetStaticProps } from "next"
import Link from "next/link"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { PageWithLayout, StaticProps } from "~/types"
import { getServerSideSiteTranslations } from "~/utils/serverSideSiteTranslations"

export const getStaticProps: GetStaticProps = async ({ locale, locales }) => {
  const props: StaticProps = {
    i18nSite: await getServerSideSiteTranslations(locale, locales),
  }
  return { props }
}

const Custom404: PageWithLayout = () => (
  <>
    <PageHead title="404" />
    <Title align="center" mt={100}>
      <Text inherit variant="gradient" span>
        404{" "}
      </Text>
      - Page Not Found
      <Link href="/">
        <Text fz="md">Go back to homepage</Text>
      </Link>
    </Title>
  </>
)

Custom404.getLayout = (page) => <MainLayout withAccountControl={false}>{page}</MainLayout>

export default Custom404
