import { Session } from "@blitzjs/auth"
import hoistNonReactStatics from "hoist-non-react-statics"
import { InitialPublicDataContextProvider } from "../contexts/InitialPublicDataContext"

interface AppProps {
  pageProps: {
    initialPublicData?: Session["PublicData"]
  }
}

export const withInitialPublicData = <T extends AppProps>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithInitialPublicData = (props: AppProps) => (
    <InitialPublicDataContextProvider value={props.pageProps.initialPublicData}>
      <WrappedComponent {...(props as T)} />
    </InitialPublicDataContextProvider>
  )

  return hoistNonReactStatics(WithInitialPublicData, WrappedComponent)
}
