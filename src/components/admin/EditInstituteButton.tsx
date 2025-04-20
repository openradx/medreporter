import { useLingui } from "@lingui/react/macro"
import { ActionIcon } from "@mantine/core"
import { Institute } from "@prisma/client"
import { Pencil as EditIcon } from "lucide-react"
import { useState } from "react"
import { EditInstituteModal } from "./EditInstituteModal"

interface EditInstituteButtonProps {
  institute: Institute
}

export const EditInstituteButton = ({ institute }: EditInstituteButtonProps) => {
  const { t } = useLingui()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <ActionIcon
        title={t`Edit institute`}
        variant="subtle"
        color="gray"
        onClick={() => setOpened(true)}
      >
        <EditIcon size={18} />
      </ActionIcon>
      {opened && (
        <EditInstituteModal
          opened={opened}
          onClose={() => setOpened(false)}
          institute={institute}
        />
      )}
    </>
  )
}
