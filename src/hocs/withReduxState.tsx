import hoistNonReactStatics from "hoist-non-react-statics"
import { ComponentType, useRef } from "react"
import { Provider as ReduxProvider } from "react-redux"
import { RESET_STATE } from "~/state/actions"
import { AppStore, makeStore } from "~/state/store"
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
    if (preloadedState && !storeRef.current) {
      storeRef.current = makeStore()
      storeRef.current.dispatch({ type: RESET_STATE, payload: preloadedState })
    }

    const preloadedStateRef = useRef(preloadedState)
    if (preloadedStateRef.current !== preloadedState) {
      preloadedStateRef.current = preloadedState
      storeRef.current?.dispatch({ type: RESET_STATE })
    }

    if (!storeRef.current) {
      return <WrappedComponent {...(props as T)} />
    }

    return (
      <ReduxProvider store={storeRef.current}>
        <WrappedComponent {...(props as T)} />
      </ReduxProvider>
    )
  }

  return hoistNonReactStatics(WithReduxState, WrappedComponent)
}
