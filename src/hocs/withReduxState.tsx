import hoistNonReactStatics from "hoist-non-react-statics"
import { ComponentType, useRef } from "react"
import { Provider as ReduxProvider } from "react-redux"
import { resetState } from "~/state/actions"
import { AppStore, makeStore, RootState } from "~/state/store"
import { ServerSideProps } from "~/types/general"

interface AppProps {
  pageProps: Partial<ServerSideProps>
}

export const withReduxState = <T extends AppProps>(
  WrappedComponent: React.ComponentType<T>
): ComponentType<T> => {
  const WithReduxState = (props: AppProps) => {
    const preloadedState = props.pageProps?.preloadedReduxState

    // see https://redux-toolkit.js.org/usage/nextjs
    const storeRef = useRef<AppStore>(undefined)
    if (!storeRef.current) {
      storeRef.current = makeStore()
    }

    const preloadedStateRef = useRef<Partial<RootState> | undefined>(undefined)
    if (preloadedStateRef.current !== preloadedState) {
      storeRef.current.dispatch(resetState(preloadedState))
      preloadedStateRef.current = preloadedState
    }

    return (
      <ReduxProvider store={storeRef.current}>
        <WrappedComponent {...(props as T)} />
      </ReduxProvider>
    )
  }

  return hoistNonReactStatics(WithReduxState, WrappedComponent)
}
