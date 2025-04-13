import hoistNonReactStatics from "hoist-non-react-statics"
import { ComponentType } from "react"
import { SiteTranslationProvider } from "~/components/common/SiteTranslationProvider"
import { SiteTranslationProviderNew } from "~/components/common/SiteTranslationProviderNew"
import { ServerSideProps } from "~/types/general"

interface AppProps {
  pageProps: Partial<ServerSideProps>
}

export const withTranslations = <T extends AppProps>(
  WrappedComponent: ComponentType<T>
): ComponentType<T> => {
  const WithTranslations = (props: AppProps) => {
    const i18nSiteProps = props.pageProps?.i18nSite

    if (!i18nSiteProps) {
      return <WrappedComponent {...(props as T)} />
    }

    return (
      <SiteTranslationProviderNew i18nSiteProps={i18nSiteProps}>
        <SiteTranslationProvider i18nSiteProps={i18nSiteProps}>
          <WrappedComponent {...(props as T)} />
        </SiteTranslationProvider>
      </SiteTranslationProviderNew>
    )
  }

  return hoistNonReactStatics(WithTranslations, WrappedComponent)
}
