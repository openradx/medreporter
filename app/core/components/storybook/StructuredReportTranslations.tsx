import { ReactNode, Suspense, useMemo } from "react"
import { I18nStructuredReportContextProvider } from "../../contexts/I18nStructuredReportContext"
import { createClient } from "../../utils/i18nStorybookClient"

const DEFAULT_ADDITIONAL_NAMESPACES: string[] = []

interface StructuredReportTranslationsProps {
  language?: string
  additionalNamespaces?: string[]
  children: ReactNode
}

export const StructuredReportTranslations = ({
  language = "en",
  additionalNamespaces = DEFAULT_ADDITIONAL_NAMESPACES,
  children,
}: StructuredReportTranslationsProps) => {
  const i18nInstances = useMemo(() => {
    const namespaces = [...additionalNamespaces, "structuredReport"]

    const client = createClient({
      lng: language,
      ns: namespaces,
      fallbackNS: namespaces,
    })

    const i18nStructure = client.i18n
    const i18nReport = client.i18n.cloneInstance()

    return {
      i18nStructure,
      i18nReport,
    }
  }, [additionalNamespaces, language])

  return (
    <Suspense fallback="Loading translations ...">
      <I18nStructuredReportContextProvider
        value={{ ...i18nInstances, supportedStructuredReportLocales: [language] }}
      >
        {children}
      </I18nStructuredReportContextProvider>
    </Suspense>
  )
}
