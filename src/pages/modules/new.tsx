import { GetServerSideProps } from "next"
import { route } from "nextjs-routes"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { NewModuleForm } from "~/components/modules/NewModuleForm"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { getServerSideSession } from "~/utils/serverSideSession"
import { getServerSideSiteTranslations } from "~/utils/serverSideSiteTranslations"

export const getServerSideProps: GetServerSideProps = async ({ req, res, locale, locales }) => {
  const session = await getServerSideSession(req, res)
  const user = session?.user

  if (!user) {
    return {
      redirect: {
        destination: route({ pathname: "/auth/login" }),
        permanent: false,
      },
    }
  }

  const props: ServerSideProps = {
    session,
    i18nSite: await getServerSideSiteTranslations(locale, locales, ["editor"]),
  }
  return { props }
}

const NewModulePage: PageWithLayout = () => {
  const { t } = useSiteTranslation()

  return (
    <>
      <PageHead title={t("NewModulePage.pageTitle")} />
      <NewModuleForm />
    </>
  )
}

NewModulePage.getLayout = (page: ReactElement) => <MainLayout size="md">{page}</MainLayout>

export default NewModulePage
