import { useLingui } from "@lingui/react/macro"
import { GetServerSideProps } from "next"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { Templates } from "~/components/templates/Templates"
import { getServerSideSession } from "~/server/utils/sessionUtils"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { loadSiteTranslation } from "~/utils/i18n"
import { redirectToLogin } from "~/utils/redirects"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  res,
  locale,
}) => {
  const session = await getServerSideSession(req, res)
  const user = session?.user

  if (!user) {
    return redirectToLogin(locale)
  }

  return {
    props: {
      session,
      translation: await loadSiteTranslation(locale),
    },
  }
}

const TemplatesPage: PageWithLayout = () => {
  const { t } = useLingui()

  return (
    <>
      <PageHead title={t`Templates`} />
      <Templates />
    </>
  )
}

TemplatesPage.getLayout = (page) => <MainLayout size="xl">{page}</MainLayout>

export default TemplatesPage
