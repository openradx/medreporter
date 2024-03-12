import { ActionIcon } from "@mantine/core"
import { Info as InfoIcon } from "lucide-react"
import { useState } from "react"
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
      <ActionIcon
        variant="transparent"
        title={t("FieldInfo.buttonInfo")}
        size={20}
        onClick={() => setOpen(true)}
      >
        <InfoIcon size={16} />
      </ActionIcon>
      <InfoModal opened={open} onClose={() => setOpen(false)}>
        {children}
      </InfoModal>
    </>
  )
}
