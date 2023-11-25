import { ActionIcon } from "@mantine/core"
import { Institute } from "@prisma/client"
import { useState } from "react"
import { MdEdit as EditIcon } from "react-icons/md"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { EditInstituteModal } from "./EditInstituteModal"

interface EditInstituteButtonProps {
  institute: Institute
}

export const EditInstituteButton = ({ institute }: EditInstituteButtonProps) => {
  const { t } = useSiteTranslation()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <ActionIcon
        title={t("EditInstituteButton.buttonEditInstitute")}
        variant="subtle"
        color="gray"
        onClick={() => setOpened(true)}
      >
        <EditIcon />
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
