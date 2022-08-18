import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { ActionIcon, Menu } from "@mantine/core"
import { NextLink } from "@mantine/next"
import { MembershipRole, UserRole } from "@prisma/client"
import Link from "next/link"
import {
  MdBuild as AdminIcon,
  MdLogout as LogoutIcon,
  MdOutlineAccountCircle as AccountIcon,
  MdOutlineLogin as LoginIcon,
  MdPerson as ProfileIcon,
} from "react-icons/md"
import logout from "../../../auth/mutations/logout"
import { useAppSession } from "../../hooks/useAppSession"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"

export const AccountControl = () => {
  const { t } = useSiteTranslation()
  const session = useAppSession({ suspense: false })
  const [logoutMutation] = useMutation(logout)

  const canAdministrate = session.roles?.some((role) => {
    const adminRoles: (UserRole | MembershipRole)[] = [
      UserRole.SUPERADMIN,
      MembershipRole.ADMIN,
      MembershipRole.OWNER,
    ]
    return adminRoles.includes(role)
  })

  return (
    <>
      {session.isLoading && <ActionIcon variant="default" loading />}
      {!session.isLoading && !session.userId && (
        <Link href={Routes.LoginPage()} passHref>
          <ActionIcon title={t("AccountControl.logInTitle")} variant="default">
            <LoginIcon size={18} />
          </ActionIcon>
        </Link>
      )}
      {!session.isLoading && session.userId && (
        <Menu width={250}>
          <Menu.Target>
            <ActionIcon title={t("AccountControl.accountTitle")} variant="default">
              <AccountIcon size={20} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>{session.username}</Menu.Label>
            <Menu.Item icon={<ProfileIcon size={18} />}>{t("AccountControl.profile")}</Menu.Item>
            {canAdministrate && (
              <Menu.Item
                component={NextLink}
                href={Routes.AdminPage()}
                icon={<AdminIcon size={18} />}
              >
                {t("AccountControl.admin")}
              </Menu.Item>
            )}
            <Menu.Item icon={<LogoutIcon size={18} />} onClick={() => logoutMutation()}>
              {t("AccountControl.logOut")}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  )
}
