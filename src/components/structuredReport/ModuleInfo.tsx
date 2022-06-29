import { ActionIcon, Tabs, Tooltip } from "@mantine/core"
import { ReactNode, useState } from "react"
import { AiOutlineInfoCircle as InfoIcon } from "react-icons/ai"
import { InfoModal } from "./InfoModal"

interface ModuleInfoProps {
  title: string
  children: ReactNode
}

export const ModuleInfo = ({ title, children }: ModuleInfoProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Tooltip label="Open Info" position="top" transition="pop" openDelay={1000}>
        <ActionIcon variant="default" onClick={() => setOpen(true)}>
          <InfoIcon size={20} />
        </ActionIcon>
      </Tooltip>
      <InfoModal title={title} opened={open} onClose={() => setOpen(false)}>
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
