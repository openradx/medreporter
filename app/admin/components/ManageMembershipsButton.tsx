import { ActionIcon } from "@mantine/core"
import { useState } from "react"
import { MdManageAccounts as ManageMembershipsIcon } from "react-icons/md"
import { Institute } from "db"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { ManageMembershipsModal } from "./ManageMembershipsModal"

interface ManageMembershipsButtonProps {
  institute: Institute
}

export const ManageMembershipsButton = ({ institute }: ManageMembershipsButtonProps) => {
  const { t } = useSiteTranslation()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <ActionIcon title={t("ManageMembershipsButton.actionTitle")} onClick={() => setOpened(true)}>
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
