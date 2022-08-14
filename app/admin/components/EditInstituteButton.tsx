import { ActionIcon } from "@mantine/core"
import { useState } from "react"
import { MdEdit as EditIcon } from "react-icons/md"
import { Institute } from "db"
import { EditInstituteModal } from "./EditInstituteModal"

interface EditInstituteButtonProps {
  institute: Institute
}

export const EditInstituteButton = ({ institute }: EditInstituteButtonProps) => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <ActionIcon onClick={() => setOpened(true)}>
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
