import { Text } from "@mantine/core"
import Link from "next/link"
import { PageHead } from "~/components/common/PageHead"
import { PageWithLayout } from "~/types"

const Custom404: PageWithLayout = () => (
  <>
    <PageHead title="404" />
    <h1>404 - Page Not Found</h1>
    <Link href="/">
      <Text>Go back to homepage</Text>
    </Link>
  </>
)

export default Custom404
