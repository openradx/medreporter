import { Modal } from "@mantine/core"
import Markdown from "react-markdown"
import { useScreenSize } from "~/hooks/useScreenSize"

interface InfoModalProps {
  opened: boolean
  onClose: () => void
  children: string
}

export const InfoModal = ({ opened, onClose, children }: InfoModalProps) => {
  const screenSize = useScreenSize()

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size={screenSize}
      styles={{ header: { marginBottom: 8 } }}
      withCloseButton={false}
    >
      <Markdown>{children}</Markdown>
    </Modal>
  )
}
