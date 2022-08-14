import { ActionIcon } from "@mantine/core"
import { useState } from "react"
import { MdManageAccounts as ManageMembershipsIcon } from "react-icons/md"
import { Institute } from "db"
import { ManageMembershipsModal } from "./ManageMembershipsModal"

interface ManageMembershipsButtonProps {
  institute: Institute
}

export const ManageMembershipsButton = ({ institute }: ManageMembershipsButtonProps) => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <ActionIcon onClick={() => setOpened(true)}>
        <ManageMembershipsIcon size={16} />
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
