import hoistNonReactStatics from "hoist-non-react-statics"
import { ComponentType } from "react"
import { SiteTranslationProvider } from "~/components/common/SiteTranslationProvider"
import { StructuredReportTranslationProvider } from "~/components/common/StructuredReportTranslationProvider"
import { ServerSideProps } from "~/types/general"

interface AppProps {
  pageProps: Partial<ServerSideProps>
}

export const withTranslations = <T extends AppProps>(
  WrappedComponent: ComponentType<T>
): ComponentType<T> => {
  const WithTranslations = (props: AppProps) => {
    const i18nSiteProps = props.pageProps?.i18nSite
    const i18nStructuredReportProps = props.pageProps?.i18nStructuredReport

    if (!i18nSiteProps && !i18nStructuredReportProps) {
      return <WrappedComponent {...(props as T)} />
    }

    if (i18nSiteProps && !i18nStructuredReportProps) {
      return (
        <SiteTranslationProvider i18nSiteProps={i18nSiteProps}>
          <WrappedComponent {...(props as T)} />
        </SiteTranslationProvider>
      )
    }

    if (i18nSiteProps && i18nStructuredReportProps) {
      return (
        <SiteTranslationProvider i18nSiteProps={i18nSiteProps}>
          <StructuredReportTranslationProvider
            i18nStructuredReportProps={i18nStructuredReportProps}
          >
            <WrappedComponent {...(props as T)} />
          </StructuredReportTranslationProvider>
        </SiteTranslationProvider>
      )
    }

    throw new Error("Invalid translations setup.")
  }

  return hoistNonReactStatics(WithTranslations, WrappedComponent)
}
