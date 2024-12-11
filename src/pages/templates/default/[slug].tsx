import { GetServerSideProps } from "next"
import { ServerSideProps } from "~/types/general"

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  query,
  resolvedUrl,
  locale,
}) => {
  const slugWithLng = query.slug as string
  const lng = slugWithLng.split("--").pop()
  const slug = slugWithLng.substring(0, slugWithLng.lastIndexOf("--"))

  if (!lng || !slug) {
    return {
      notFound: true,
    }
  }

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

export default function RedirectPage() {
  return null
}
