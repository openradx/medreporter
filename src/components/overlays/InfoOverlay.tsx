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
      <Tooltip label="Open Info" position="bottom" transition="scale-y">
        <ActionIcon onClick={handleClickOpen} sx={{ p: "0", pl: "4px", pointerEvents: "auto" }}>
          <InfoIcon fontSize="small" />
        </ActionIcon>
      </Tooltip>
      <Modal
        opened={open}
        onClose={handleClose}
        title={title}
        overflow="inside"
        closeOnEscape
        closeOnClickOutside={false}
        transition="scale-y"
        size="md"
      >
        {content}
      </Modal>
    </>
  )
}
