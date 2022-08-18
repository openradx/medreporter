import { ActionIcon, Tooltip } from "@mantine/core"
import { ReactNode, useState } from "react"
import { TbInfoCircle as InfoIcon } from "react-icons/tb"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { useModule } from "../../contexts/ModuleContext"
import { InfoModal } from "./InfoModal"

interface ModuleInfoProps {
  children: ReactNode
}

export const ModuleInfo = ({ children }: ModuleInfoProps) => {
  const { t } = useSiteTranslation()
  const { title } = useModule()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Tooltip label="Open Info" position="top" transition="pop" openDelay={1000}>
        <ActionIcon
          title={t("ModuleInfo.actionTitle")}
          variant="default"
          onClick={() => setOpen(true)}
        >
          <InfoIcon size={20} />
        </ActionIcon>
      </Tooltip>
      <InfoModal title={title} opened={open} onClose={() => setOpen(false)}>
        {children}
      </InfoModal>
    </>
  )
}
