import { Trans, useLingui } from "@lingui/react/macro"
import { ActionIcon, Menu } from "@mantine/core"
import { MembershipRole, UserRole } from "@prisma/client"
import {
  Wrench as AdminIcon,
  LogOut as LogoutIcon,
  CircleUser as AccountIcon,
  LogIn as LoginIcon,
  User as ProfileIcon,
} from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"

export const AccountControl = () => {
  const { t } = useLingui()
  const session = useSession()
  const router = useRouter()

  const canAdministrate = session.data?.user.roles.some((role) => {
    const adminRoles: (UserRole | MembershipRole)[] = [
      UserRole.SUPERUSER,
      MembershipRole.ADMIN,
      MembershipRole.OWNER,
    ]
    return adminRoles.includes(role)
  })

  return (
    <>
      {session.status === "loading" && <ActionIcon variant="default" loading />}
      {session.status === "unauthenticated" && (
        <ActionIcon
          title={t`Login`}
          variant="default"
          onClick={() => {
            router.push({
              pathname: "/auth/login",
              query: { callbackUrl: router.asPath },
            })
          }}
        >
          <LoginIcon size={18} />
        </ActionIcon>
      )}
      {session.status === "authenticated" && (
        <Menu width={250}>
          <Menu.Target>
            <ActionIcon title={t`Accout`} variant="default">
              <AccountIcon size={20} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>{session.data.user.username}</Menu.Label>
            <Menu.Item leftSection={<ProfileIcon size={18} />}>
              <Trans>User profile</Trans>
            </Menu.Item>
            {canAdministrate && (
              <Menu.Item
                component={Link}
                href={{ pathname: "/admin" }}
                leftSection={<AdminIcon size={18} />}
              >
                <Trans>Admin</Trans>
              </Menu.Item>
            )}
            <Menu.Item
              leftSection={<LogoutIcon size={18} />}
              onClick={async () => {
                await signOut({ redirect: false })
                router.push("/")
              }}
            >
              <Trans>Log out</Trans>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  )
}
