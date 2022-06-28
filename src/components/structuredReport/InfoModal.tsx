import { Modal, ModalProps, useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { ReactNode } from "react"

interface InfoModalProps {
  title: string
  opened: boolean
  onClose: () => void
  children: ReactNode
}

export const InfoModal = ({ title, opened, onClose, children }: InfoModalProps) => {
  const theme = useMantineTheme()
  const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`)

  // TODO:
  const size: ModalProps["size"] = isSmallScreen ? "xs" : "xl"

  return (
    <Modal opened={opened} onClose={onClose} title={title} overflow="inside" size={size}>
      {children}
    </Modal>
  )
}
