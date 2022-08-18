import { ActionIcon } from "@mantine/core"
import { useState } from "react"
import { MdEdit as EditIcon } from "react-icons/md"
import { Institute } from "db"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { EditInstituteModal } from "./EditInstituteModal"

interface EditInstituteButtonProps {
  institute: Institute
}

export const EditInstituteButton = ({ institute }: EditInstituteButtonProps) => {
  const { t } = useSiteTranslation()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <ActionIcon title={t("EditInstituteButton.actionTitle")} onClick={() => setOpened(true)}>
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
