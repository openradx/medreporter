import { Text, Title } from "@mantine/core"
import { GetStaticProps } from "next"
import Link from "next/link"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { getServerSideSiteTranslations } from "~/server/utils/siteTranslations"
import { PageWithLayout, StaticProps } from "~/types/general"

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
      <Link href="/" style={{ textDecoration: "none" }}>
        <Text fz="md" color="blue">
          Go back to homepage
        </Text>
      </Link>
    </Title>
  </>
)

Custom404.getLayout = (page) => <MainLayout withoutAccountControl>{page}</MainLayout>

export default Custom404
