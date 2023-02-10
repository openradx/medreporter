import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import { SignupForm } from "~/components/auth/SignupForm"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { getServerSideSiteTranslations } from "~/utils/serverSideSiteTranslations"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  locale,
  locales,
}) => ({
  props: {
    i18nSite: await getServerSideSiteTranslations(locale, locales),
  },
})

const SignupPage: PageWithLayout = () => {
  const { t } = useSiteTranslation()
  const router = useRouter()

  return (
    <>
      <PageHead title={t("SignupPage.pageTitle")} />
      <SignupForm onSuccess={() => router.push("/")} />
    </>
  )
}

SignupPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default SignupPage