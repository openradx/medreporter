import hoistNonReactStatics from "hoist-non-react-statics"
import { ServerSessionProvider } from "~/components/common/ServerSessionProvider"
import { ServerSideProps } from "~/types/general"

interface AppProps {
  pageProps: ServerSideProps
}

export const withServerSession = <T extends AppProps>(
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<T> => {
  const WithServerSession = (props: AppProps) => {
    const session = props.pageProps.session

    return (
      <ServerSessionProvider session={session}>
        <WrappedComponent {...(props as T)} />
      </ServerSessionProvider>
    )
  }

  return hoistNonReactStatics(WithServerSession, WrappedComponent)
}
