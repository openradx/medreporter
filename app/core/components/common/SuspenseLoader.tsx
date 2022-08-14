import { Center, Loader } from "@mantine/core"
import { ReactNode, Suspense } from "react"

interface SuspenseLoadingProps {
  children: ReactNode
}

export const SuspenseLoader = ({ children }: SuspenseLoadingProps) => (
  <Suspense
    fallback={
      <Center py="xl">
        <Loader variant="bars" />
      </Center>
    }
  >
    {children}
  </Suspense>
)
