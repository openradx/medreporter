import { ActionIcon } from "@mantine/core"
import { Institute } from "@prisma/client"
import { UserCog as ManageMembershipsIcon } from "lucide-react"
import { useState } from "react"
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
