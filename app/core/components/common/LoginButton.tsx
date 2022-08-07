import { Routes } from "@blitzjs/next"
import { ActionIcon } from "@mantine/core"
import Link from "next/link"
import { BiLogIn as LoginIcon } from "react-icons/bi"

export const LoginButton = () => (
  <Link href={Routes.LoginPage()} passHref>
    <ActionIcon variant="default">
      <LoginIcon size={18} />
    </ActionIcon>
  </Link>
)
