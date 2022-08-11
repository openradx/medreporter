import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { gSSP } from "../../blitz-server"
import { serverSideInitialPublicData } from "./serverSideInitialPublicData"
import { serverSideSiteTranslations } from "./serverSideSiteTranslations"

interface ServerSideProps {
  additionalSiteNamespaces?: string[]
  additionalStructuredReportNamespaces?: string[]
}

const serverSideProps: () => GetServerSideProps = () => {
  console.log("foo")

  return gSSP(async (ctx) => ({
    props: {
      ...(await serverSideInitialPublicData(ctx.req, ctx.res)),
      ...(await serverSideSiteTranslations(ctx.locale!, ctx.locales!)),
    },
  }))
}

export default serverSideProps
