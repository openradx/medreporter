import { useEffect, useState } from "react"
import { AuthenticationError } from "~/errors"
import { isClient } from "~/utils/misc"
import { useUser } from "./useUser"

export const useAuthenticatedUser = () => {
  const user = useUser()

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (isClient && mounted && !user) {
    throw new AuthenticationError()
  }

  return user!
}
