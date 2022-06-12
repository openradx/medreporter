import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "../../utils/i18nServerClient"

const structuredReportLocalesApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { lng, ns },
  } = req

  const languages = typeof lng === "string" ? lng.split(" ") : []
  const namespaces = typeof ns === "string" ? ns.split(" ") : []

  const { i18n, initPromise } = createClient({
    preload: languages,
    ns: namespaces,
  })

  await initPromise

  res.statusCode = 200
  res.json(i18n.store.data)
}

export default structuredReportLocalesApi
