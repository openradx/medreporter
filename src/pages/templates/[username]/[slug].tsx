import { Visibility } from "@prisma/client"
import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { TemplateAdapter } from "~/components/adapters/TemplateAdapter"
import { MainLayout } from "~/components/common/MainLayout"
import { PageHead } from "~/components/common/PageHead"
import { TemplateNode } from "~/schemas/template"
import { prisma } from "~/server/prisma"
import { getServerSideSession } from "~/server/utils/sessionUtils"
import { useAppSelector } from "~/state/store"
import { selectTemplate } from "~/state/templateSlice"
import { PageWithLayout, ServerSideProps } from "~/types/general"
import { loadSiteTranslation } from "~/utils/i18n"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  res,
  locale,
  params,
}) => {
  const { username, slug } = params as { username: string; slug: string }

  const session = await getServerSideSession(req, res)

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
    res.statusCode = 403 // Forbidden
    return { props: {} } // TODO:
  }

  const content = template.document as TemplateNode
  content.id = template.id

  return {
    props: {
      session: await getServerSideSession(req, res),
      translation: await loadSiteTranslation(locale),
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
