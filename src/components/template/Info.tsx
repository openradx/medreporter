import { useLingui } from "@lingui/react/macro"
import { ActionIcon } from "@mantine/core"
import { Info as InfoIcon } from "lucide-react"
import { useState } from "react"
import { InfoModal } from "./InfoModal"

interface InfoProps {
  children: string
}

export const Info = ({ children }: InfoProps) => {
  const [open, setOpen] = useState(false)
  const { t } = useLingui()

  return (
    <>
      <ActionIcon
        variant="transparent"
        title={t`Additional info`}
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
