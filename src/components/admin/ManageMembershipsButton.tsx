import { ActionIcon } from "@mantine/core"
import { Institute } from "@prisma/client"
import { useState } from "react"
import { MdManageAccounts as ManageMembershipsIcon } from "react-icons/md"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { ManageMembershipsModal } from "./ManageMembershipsModal"

interface ManageMembershipsButtonProps {
  institute: Institute
}

export const ManageMembershipsButton = ({ institute }: ManageMembershipsButtonProps) => {
  const { t } = useSiteTranslation()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <ActionIcon
        title={t("ManageMembershipsButton.buttonManageMemberships")}
        onClick={() => setOpened(true)}
      >
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
