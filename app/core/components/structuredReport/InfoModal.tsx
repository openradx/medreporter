import { Group, Modal, Tabs } from "@mantine/core"
import { Children, isValidElement, ReactElement, ReactNode } from "react"
import { TbInfoCircle as InfoIcon } from "react-icons/tb"
import { useScreenSize } from "../../hooks/useScreenSize"

interface InfoModalProps {
  title?: string
  opened: boolean
  onClose: () => void
  children: ReactNode
}

export const InfoModal = ({ title, opened, onClose, children }: InfoModalProps) => {
  const tabTitles: string[] = []
  const infoTabs: ReactElement[] = []
  const otherContent: ReactNode[] = []

  Children.forEach(children, (child) => {
    if (isValidElement(child) && typeof child.type !== "string") {
      if (child.type.name === "InfoTab") {
        const tabTitle = child.props.title as string
        tabTitles.push(tabTitle)
        infoTabs.push(child)
        return
      }
    }
    otherContent.push(child)
  })

  const screenSize = useScreenSize()

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group spacing="xs">
          <InfoIcon size={20} />
          {title}
        </Group>
      }
      size={screenSize}
      styles={{ header: { marginBottom: 8 } }}
    >
      {tabTitles.length > 0 && (
        <Tabs defaultValue="tab0">
          <Tabs.List>
            {tabTitles.map((tabTitle, index) => (
              <Tabs.Tab key={`tab${index}`} value={`tab${index}`}>
                {tabTitle}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {infoTabs.map((infoTab, index) => (
            <Tabs.Panel key={`tab${index}`} value={`tab${index}`} pt="sm">
              {infoTab}
            </Tabs.Panel>
          ))}
        </Tabs>
      )}
      {otherContent}
    </Modal>
  )
}
