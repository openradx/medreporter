import { Modal, Tabs } from "@mantine/core"
import { Children, isValidElement, ReactElement, ReactNode } from "react"
import { useScreenSize } from "../../hooks/useScreenSize"

interface InfoModalProps {
  title: string
  opened: boolean
  onClose: () => void
  children: ReactNode
}

export const InfoModal = ({ title, opened, onClose, children }: InfoModalProps) => {
  const tabTitles: string[] = []
  const infoTabs: ReactElement[] = []

  Children.forEach(children, (child) => {
    if (isValidElement(child) && typeof child.type !== "string") {
      const { name } = child.type
      if (name === "InfoTab") {
        const tabTitle = child.props.title as string
        tabTitles.push(tabTitle)
        infoTabs.push(child)
      }
    }
  })

  const screenSize = useScreenSize()

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      size={screenSize}
      styles={{ header: { marginBottom: 8 } }}
    >
      <Tabs defaultValue={tabTitles[0]}>
        <Tabs.List>
          {tabTitles.map((tabTitle) => (
            <Tabs.Tab key={tabTitle} value={tabTitle}>
              {tabTitle}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {infoTabs.map((infoTab, index) => (
          <Tabs.Panel key={tabTitles[index]} value={tabTitles[index]} pt="sm">
            {infoTab}
          </Tabs.Panel>
        ))}
      </Tabs>
    </Modal>
  )
}
