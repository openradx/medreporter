import { useRouter } from "next/router"
import { useEffect } from "react"

export const useOnRouteChange = (callback: () => void) => {
  const router = useRouter()

  useEffect(() => {
    const handleStart = (_url: string, { shallow }: { shallow: boolean }) => {
      if (!shallow) {
        callback()
      }
    }

    router.events.on("routeChangeStart", handleStart)

    return () => {
      router.events.off("routeChangeStart", handleStart)
    }
  }, [router, callback])
}
