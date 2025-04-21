import hoistNonReactStatics from "hoist-non-react-statics"
import { ComponentType } from "react"
import { SiteTranslationProvider } from "~/components/common/SiteTranslationProvider"
import { ServerSideProps } from "~/types/general"

interface AppProps {
  pageProps: Partial<ServerSideProps>
}

export const withTranslations = <T extends AppProps>(
  WrappedComponent: ComponentType<T>
): ComponentType<T> => {
  const WithTranslations = (props: AppProps) => {
    const translation = props.pageProps?.translation

    if (!translation) {
      return <WrappedComponent {...(props as T)} />
    }

    return (
      <SiteTranslationProvider translation={translation}>
        <WrappedComponent {...(props as T)} />
      </SiteTranslationProvider>
    )
  }

  return hoistNonReactStatics(WithTranslations, WrappedComponent)
}
