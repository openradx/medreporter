import Head from "next/head"

interface PageHeadProps {
  title: string
  description?: string
}

export const PageHead = ({ title, description }: PageHeadProps) => {
  const titleContent = `${title} - MedReporter`

  return (
    <Head>
      <title key="title">{titleContent}</title>
      <meta key="description" name="description" content={description} />
    </Head>
  )
}
