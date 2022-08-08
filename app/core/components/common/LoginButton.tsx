import { Routes } from "@blitzjs/next"
import { ActionIcon } from "@mantine/core"
import Link from "next/link"
import { MdOutlineLogin as LoginIcon } from "react-icons/md"

export const LoginButton = () => (
  <Link href={Routes.LoginPage()} passHref>
    <ActionIcon variant="default">
      <LoginIcon size={18} />
    </ActionIcon>
  </Link>
)
