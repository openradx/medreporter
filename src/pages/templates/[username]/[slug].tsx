import { Visibility } from "@prisma/client"
import { fromNodeHeaders } from "better-auth/node"
import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { TemplateAdapter } from "~/components/adapters/TemplateAdapter"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { TemplateNode } from "~/schemas/template"
import { auth } from "~/server/auth"
import { prisma } from "~/server/prisma"
import { getServerSideSiteTranslations } from "~/server/utils/siteTranslations"
import { useAppSelector } from "~/state/store"
import { selectTemplate } from "~/state/templateSlice"
import { PageWithLayout, ServerSideProps } from "~/types/general"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  locale,
  locales,
  params,
}) => {
  const { username, slug } = params as { username: string; slug: string }

  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })

  const templateUser = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!templateUser) {
    return { notFound: true }
  }

  const template = await prisma.template.findUnique({
    where: {
      authorId_slug: {
        authorId: templateUser.id,
        slug,
      },
    },
  })

  if (!template) {
    return { notFound: true }
  }

  if (template.visibility === Visibility.PRIVATE && session?.user.id !== template.authorId) {
    return {
      redirect: {
        destination: "/403", // TODO: add a 403 page
        permanent: false,
      },
    }
  }

  const content = template.document as TemplateNode
  content.id = template.id

  return {
    props: {
      session,
      i18nSite: await getServerSideSiteTranslations(locale, locales, ["template", "designer"]),
      preloadedReduxState: {
        template: {
          past: [],
          present: content,
          future: [],
          paused: false,
        },
      },
    },
  }
}

const TemplatePage: PageWithLayout = () => {
  const template = useAppSelector(selectTemplate)

  return (
    <>
      <PageHead title={template.title} />

      <TemplateAdapter node={template} />
    </>
  )
}

TemplatePage.getLayout = (page: ReactElement) => (
  <MainLayout size="full" footerSize="small">
    {page}
  </MainLayout>
)

export default TemplatePage
