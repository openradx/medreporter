import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { MainLayout } from "~/components/common/MainLayout"
import { defaultTemplateRegistry } from "~/default-templates"
import { getServerSideSession } from "~/server/utils/sessionUtils"
import { getServerSideSiteTranslations } from "~/server/utils/siteTranslations"
import { PageWithLayout, ServerSideProps } from "~/types/general"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  res,
  query,
  resolvedUrl,
  locale,
  locales,
}) => {
  const querySlug = query.slug as string
  const slug = querySlug.substring(0, querySlug.lastIndexOf("--"))
  const lng = querySlug.split("--").pop()

  if (slug && lng) {
    const basePath = resolvedUrl.substring(0, resolvedUrl.lastIndexOf("/"))
    let destination = `${basePath}/${slug}`
    if (lng !== locale) {
      destination = `${destination}?sl=${lng}&rl=${lng}`
    }

    return {
      redirect: {
        permanent: false,
        destination,
      },
    }
  }

  return {
    props: {
      slug,
      session: await getServerSideSession(req, res),
      i18nSite: await getServerSideSiteTranslations(locale, locales, ["template"]),
      preloadedReduxState: {},
    },
  }
}

const DefaultTemplatePage: PageWithLayout<{ slug: string }> = ({ slug }) => {
  const Component = defaultTemplateRegistry[slug as any]
  return <Component />
}

DefaultTemplatePage.getLayout = (page: ReactElement) => (
  <MainLayout size="full" footerSize="small">
    {page}
  </MainLayout>
)

export default DefaultTemplatePage
