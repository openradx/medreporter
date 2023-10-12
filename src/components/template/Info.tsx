import { ActionIcon, Tooltip } from "@mantine/core"
import { useState } from "react"
import { AiOutlineInfoCircle as InfoIcon } from "react-icons/ai"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { InfoModal } from "./InfoModal"

interface InfoProps {
  children: string
}

export const Info = ({ children }: InfoProps) => {
  const [open, setOpen] = useState(false)
  const { t } = useSiteTranslation()

  return (
    <>
      <Tooltip
        label="Open Info"
        position="top"
        transitionProps={{ transition: "pop" }}
        openDelay={1000}
      >
        <ActionIcon title={t("FieldInfo.buttonInfo")} size={20} onClick={() => setOpen(true)}>
          <InfoIcon />
        </ActionIcon>
      </Tooltip>
      <InfoModal opened={open} onClose={() => setOpen(false)}>
        {children}
      </InfoModal>
    </>
  )
}
