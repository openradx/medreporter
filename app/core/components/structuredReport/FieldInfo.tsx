import { ActionIcon, Tooltip } from "@mantine/core"
import { ReactNode, useState } from "react"
import { AiOutlineInfoCircle as InfoIcon } from "react-icons/ai"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"
import { InfoModal } from "./InfoModal"

interface FieldInfoProps {
  title: string
  children: ReactNode
}

export const FieldInfo = ({ title, children }: FieldInfoProps) => {
  const [open, setOpen] = useState(false)
  const { t } = useSiteTranslation()

  return (
    <>
      <Tooltip label="Open Info" position="top" transition="pop" openDelay={1000}>
        <ActionIcon title={t("FieldInfo.buttonInfo")} size={20} onClick={() => setOpen(true)}>
          <InfoIcon />
        </ActionIcon>
      </Tooltip>
      <InfoModal title={title} opened={open} onClose={() => setOpen(false)}>
        {children}
      </InfoModal>
    </>
  )
}
