import hoistNonReactStatics from "hoist-non-react-statics"
import { ComponentType, useMemo } from "react"
import { Provider as ReduxProvider } from "react-redux"
import { initStore } from "../state/store"
import { ReduxStateProps } from "../types"

interface AppProps {
  pageProps?: Partial<ReduxStateProps>
}

export const appWithReduxState = <T extends AppProps>(
  WrappedComponent: React.ComponentType<T>
): ComponentType<T> => {
  const AppWithReduxState = (props: AppProps) => {
    const preloadedState = props.pageProps?._preloadedReduxState
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

  return hoistNonReactStatics(AppWithReduxState, WrappedComponent)
}
