import { ActionIcon } from "@mantine/core"
import { ReactElement, useState } from "react"
import { BiImageAlt as ImageIcon } from "react-icons/bi"
import { getFieldContext } from "~/contexts/FieldContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { GraphicsModal } from "./GraphicsModal"

interface FieldGraphicsProps {
  title: string
  svg: ReactElement
  labels: Record<string, string>
  mapping?: Record<string, string>
}

export const FieldGraphics = ({ title, svg, labels, mapping }: FieldGraphicsProps) => {
  const [open, setOpen] = useState(false)
  const { useField } = getFieldContext<string[] | string | null>()
  const { value, onChange } = useField()

  const { t } = useSiteTranslation()

  const handleClickOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <ActionIcon
        title={t("FieldGraphics.buttonGraphic")}
        onClick={handleClickOpen}
        sx={{ pointerEvents: "auto" }}
        size={20}
      >
        <ImageIcon />
      </ActionIcon>
      <GraphicsModal
        title={title}
        opened={open}
        onClose={() => setOpen(false)}
        svg={svg}
        labels={labels}
        value={value}
        onChange={onChange}
        mapping={mapping}
      />
    </>
  )
}
