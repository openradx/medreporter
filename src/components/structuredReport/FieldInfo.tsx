import { ActionIcon, Tabs, Tooltip } from "@mantine/core"
import { ReactNode, useState } from "react"
import { AiOutlineInfoCircle as InfoIcon } from "react-icons/ai"
import { InfoModal } from "./InfoModal"

interface FieldInfoProps {
  title: string
  children: ReactNode
}

export const FieldInfo = ({ title, children }: FieldInfoProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Tooltip label="Open Info" position="top" transition="pop" openDelay={1000}>
        <ActionIcon size={20} onClick={() => setOpen(true)}>
          <InfoIcon />
        </ActionIcon>
      </Tooltip>
      <InfoModal title={title} opened={open} onClose={() => setOpen(false)}>
        {children}
        <Tabs defaultValue="references">
          <Tabs.List>
            <Tabs.Tab value="foo">Foo</Tabs.Tab>
            <Tabs.Tab value="references">References</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="references">{children}</Tabs.Panel>
        </Tabs>
      </InfoModal>
    </>
  )
}
