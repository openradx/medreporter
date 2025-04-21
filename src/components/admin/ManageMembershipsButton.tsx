import { useLingui } from "@lingui/react/macro"
import { ActionIcon } from "@mantine/core"
import { Institute } from "@prisma/client"
import { UserCog as ManageMembershipsIcon } from "lucide-react"
import { useState } from "react"
import { ManageMembershipsModal } from "./ManageMembershipsModal"

interface ManageMembershipsButtonProps {
  institute: Institute
}

export const ManageMembershipsButton = ({ institute }: ManageMembershipsButtonProps) => {
  const { t } = useLingui()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <ActionIcon
        title={t`Manage memberships`}
        variant="subtle"
        color="gray"
        onClick={() => setOpened(true)}
      >
        <ManageMembershipsIcon size={18} />
      </ActionIcon>
      {opened && (
        <ManageMembershipsModal
          opened={opened}
          onClose={() => setOpened(false)}
          institute={institute}
        />
      )}
    </>
  )
}
