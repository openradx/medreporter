import { Redirect } from "next"
import { route } from "nextjs-routes"

export function redirectToLogin(locale?: string): { redirect: Redirect } {
  const loginRoute = route({ pathname: "/auth/login" })
  const destination = locale ? `/${locale}${loginRoute}` : loginRoute
  return {
    redirect: {
      destination,
      permanent: false,
    },
  }
}
