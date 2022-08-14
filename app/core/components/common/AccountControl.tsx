import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { ActionIcon, Menu } from "@mantine/core"
import Link from "next/link"
import {
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

  console.log(session)

  return (
    <>
      {session.isLoading && <ActionIcon variant="default" loading />}
      {!session.isLoading && !session.userId && (
        <Link href={Routes.LoginPage()} passHref>
          <ActionIcon variant="default">
            <LoginIcon size={18} />
          </ActionIcon>
        </Link>
      )}
      {!session.isLoading && session.userId && (
        <Menu width={250}>
          <Menu.Target>
            <ActionIcon variant="default">
              <AccountIcon size={20} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>{session.username}</Menu.Label>
            <Menu.Item icon={<ProfileIcon size={18} />}>{t("AccountControl.profile")}</Menu.Item>
            <Menu.Item icon={<LogoutIcon size={18} />} onClick={() => logoutMutation()}>
              {t("AccountControl.logOut")}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  )
}
