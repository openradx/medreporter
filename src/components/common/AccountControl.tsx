import { ActionIcon, Menu } from "@mantine/core"
import { MembershipRole, UserRole } from "@prisma/client"
import {
  Wrench as AdminIcon,
  LogOut as LogoutIcon,
  CircleUser as AccountIcon,
  LogIn as LoginIcon,
  User as ProfileIcon,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { authClient } from "~/auth-client"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { useUser } from "~/hooks/useUser"

export const AccountControl = () => {
  const { t } = useSiteTranslation()
  const router = useRouter()

  const user = useUser()

  const canAdministrate = !!user?.roles.some((role) => {
    const adminRoles: (UserRole | MembershipRole)[] = [
      UserRole.SUPERUSER,
      MembershipRole.ADMIN,
      MembershipRole.OWNER,
    ]
    return adminRoles.includes(role)
  })

  return (
    <>
      {!user && (
        <ActionIcon
          title={t("AccountControl.optionLogIn")}
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
      {user && (
        <Menu width={250}>
          <Menu.Target>
            <ActionIcon title={t("AccountControl.menuTitleAccout")} variant="default">
              <AccountIcon size={20} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>{user.username}</Menu.Label>
            <Menu.Item leftSection={<ProfileIcon size={18} />}>
              {t("AccountControl.optionProfile")}
            </Menu.Item>
            {canAdministrate && (
              <Menu.Item
                component={Link}
                href={{ pathname: "/admin" }}
                leftSection={<AdminIcon size={18} />}
              >
                {t("AccountControl.optionAdmin")}
              </Menu.Item>
            )}
            <Menu.Item
              leftSection={<LogoutIcon size={18} />}
              onClick={async () => {
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/")
                    },
                  },
                })
              }}
            >
              {t("AccountControl.optionLogOut")}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  )
}
