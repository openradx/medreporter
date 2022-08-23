import Head from "next/head"

interface PageHeadProps {
  title: string
  description?: string
}

export const PageHead = ({ title, description }: PageHeadProps) => (
  <Head>
    <title key="title">{title} - MedReporter</title>
    <meta key="description" name="description" content={description} />
  </Head>
)
