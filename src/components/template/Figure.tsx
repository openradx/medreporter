import { ActionIcon } from "@mantine/core"
import { useState } from "react"
import { BiImageAlt as ImageIcon } from "react-icons/bi"
import { useChoiceField } from "~/contexts/ChoiceFieldContext"
import { getFieldContext } from "~/contexts/FieldContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { FigureModal } from "./FigureModal"

interface FigureProps {
  children: string
}

export const Figure = ({ children }: FigureProps) => {
  const [open, setOpen] = useState(false)
  const { options } = useChoiceField()
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
      <FigureModal
        opened={open}
        onClose={() => setOpen(false)}
        options={options}
        value={value}
        onChange={onChange}
      >
        {children}
      </FigureModal>
    </>
  )
}
