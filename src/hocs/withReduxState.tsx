import hoistNonReactStatics from "hoist-non-react-statics"
import { ComponentType, useMemo } from "react"
import { Provider as ReduxProvider } from "react-redux"
import { initStore } from "~/state/store"
import { ServerSideProps } from "~/types"

interface AppProps {
  pageProps: Partial<ServerSideProps>
}

export const withReduxState = <T extends AppProps>(
  WrappedComponent: React.ComponentType<T>
): ComponentType<T> => {
  const WithReduxState = (props: AppProps) => {
    const preloadedState = props.pageProps?.preloadedReduxState
    const store = useMemo(() => {
      if (!preloadedState) return null

      return initStore(preloadedState)
    }, [preloadedState])

    if (!store) {
      return <WrappedComponent {...(props as T)} />
    }

    return (
      <ReduxProvider store={store}>
        <WrappedComponent {...(props as T)} />
      </ReduxProvider>
    )
  }

  return hoistNonReactStatics(WithReduxState, WrappedComponent)
}
