import { ActionIcon, Modal, Tooltip } from "@mantine/core"
import { useState } from "react"
import { AiOutlineInfoCircle as InfoIcon } from "react-icons/ai"

interface InfoOverlayProps {
  title: string
  content: any
}

export const InfoOverlay = ({ title, content }: InfoOverlayProps) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Tooltip label="Open Info" position="top" transition="pop" openDelay={1000}>
        <ActionIcon sx={{ marginLeft: 4 }} size={20} onClick={handleClickOpen}>
          <InfoIcon />
        </ActionIcon>
      </Tooltip>
      <Modal opened={open} onClose={handleClose} title={title} overflow="inside" size="md">
        {content}
      </Modal>
    </>
  )
}
