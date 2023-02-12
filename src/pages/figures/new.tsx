import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { NewModuleForm } from "~/components/modules/NewModuleForm"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { redirectToLogin } from "~/utils/serverSideRedirects"
import { getServerSideSession } from "~/utils/serverSideSession"
import { getServerSideSiteTranslations } from "~/utils/serverSideSiteTranslations"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  res,
  locale,
  locales,
}) => {
  const session = await getServerSideSession(req, res)
  const user = session?.user

  if (!user) {
    return redirectToLogin(locale)
  }

  return {
    props: {
      session,
      i18nSite: await getServerSideSiteTranslations(locale, locales, ["editor"]),
    },
  }
}

const NewFigurePage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("NewFigurePage.pageTitle")} />
      <NewModuleForm />
    </>
  )
}

NewFigurePage.getLayout = (page: ReactElement) => <MainLayout size="md">{page}</MainLayout>

export default NewFigurePage
