import { ActionIcon, Box, Modal, Tooltip } from "@mantine/core"
import { MouseEvent, useState } from "react"
import { GrRotateLeft as ResetIcon } from "react-icons/gr"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { Option } from "~/schemas/structure"

interface GraphicsModalProps {
  opened: boolean
  onClose: () => void
  value: string | string[] | null
  options: Option[]
  onChange: (value: string | string[] | null) => void
  children: string
}

export const FigureModal = ({
  opened,
  onClose,
  value,
  options,
  onChange,
  children,
}: GraphicsModalProps) => {
  const [tooltipTitle, setTooltipTitle] = useState("")
  const [hoverTagName, setHoverTagName] = useState("")

  const { t } = useSiteTranslation()

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    const optionValue = target.parentElement?.id ? target.parentElement?.id : target.id
    const tagName = target.parentElement?.id ? target.parentElement.tagName : target.tagName

    const label = options.find((option) => option.value === optionValue)?.label
    setTooltipTitle(label || "")
    setHoverTagName(tagName || "")
  }

  const multiple = Array.isArray(value)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    const target = event.target as HTMLElement
    const optionValue = target.parentElement?.id ? target.parentElement?.id : target.id
    if (optionValue) {
      if (multiple) {
        if (!Array.isArray(value)) {
          throw new Error("Value in multiple must be an array.")
        }
        const indexToRemove = value.indexOf(optionValue)
        if (indexToRemove === -1) {
          onChange?.([...value, optionValue])
        } else {
          onChange?.([...value.slice(0, indexToRemove), ...value.slice(indexToRemove + 1)])
        }
      } else {
        if (typeof value !== "string" && value !== null) {
          throw new Error("Value in single must be a string or null.")
        }
        if (optionValue !== value) {
          onChange?.(optionValue)
        } else {
          onChange?.(null)
        }
      }
    }
  }

  const selectedCss = () => {
    const cssClicked = {
      fill: "red",
      fillOpacity: 1,
      stroke: "#C1272D",
      strokeWidth: "0.5pt",
    }
    if (multiple) {
      const values = value as string[]
      return Object.fromEntries(
        values.map((optionValue) => {
          const cssSelector = `& #${optionValue}`
          return [cssSelector, cssClicked]
        })
      )
    }
    if (value) {
      const cssSelector = `& #${value}`
      return { [cssSelector]: cssClicked }
    }
    return {}
  }

  return (
    <Modal opened={opened} onClose={onClose} withCloseButton={false} size="80%">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "auto",
        }}
      >
        <Tooltip.Floating
          label={tooltipTitle}
          position="top"
          sx={{ visibility: tooltipTitle ? "visible" : "hidden" }}
        >
          <Box
            onMouseMove={handleMouseMove}
            onClick={handleClick}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              outline: "none",
              "& svg": {
                maxWidth: "70vw",
                maxHeight: "70vh",
                cursor: "default",
                [`& ${hoverTagName}[id]:hover`]: {
                  fill: "orange",
                  fillOpacity: 1,
                  stroke: "",
                  strokeWidth: "",
                },
              },
              "& [id]": { cursor: "pointer" },
              "& text": { pointerEvents: "none" },
              ...selectedCss(),
            }}
          >
            {children}
            <ActionIcon
              title={t("GraphicsModal.buttonReset")}
              onClick={(event: { stopPropagation: () => void }) => {
                event.stopPropagation()
                onChange?.(multiple ? [] : null)
              }}
              sx={{ position: "absolute", right: 8, bottom: 16 }}
            >
              <ResetIcon />
            </ActionIcon>
          </Box>
        </Tooltip.Floating>
      </Box>
    </Modal>
  )
}
