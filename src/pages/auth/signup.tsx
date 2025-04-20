import { useLingui } from "@lingui/react/macro"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import { SignupForm } from "~/components/auth/SignupForm"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { getServerSideSiteTranslations } from "~/server/utils/siteTranslations"
import { PageWithLayout, ServerSideProps } from "~/types/general"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  locale,
  locales,
}) => ({
  props: {
    i18nSite: await getServerSideSiteTranslations(locale, locales),
  },
})

const SignupPage: PageWithLayout = () => {
  const { t } = useLingui()
  const router = useRouter()

  return (
    <>
      <PageHead title={t`Sign up`} />
      <SignupForm onSuccess={() => router.push("/")} />
    </>
  )
}

SignupPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default SignupPage
