import { Box, Modal } from "@mantine/core"
import Markdown from "react-markdown"
import { useScreenSize } from "~/hooks/useScreenSize"
import classes from "./InfoModal.module.css"

interface InfoModalProps {
  opened: boolean
  onClose: () => void
  children: string
}

export const InfoModal = ({ opened, onClose, children }: InfoModalProps) => {
  const screenSize = useScreenSize()

  return (
    <Modal opened={opened} onClose={onClose} size={screenSize} withCloseButton={false}>
      <Box p="sm" className={classes.infoModal}>
        <Markdown>{children}</Markdown>
      </Box>
    </Modal>
  )
}
