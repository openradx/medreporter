import { ActionIcon, Modal, Tooltip, Box } from "@mantine/core"
import { ReactElement, useState, MouseEvent } from "react"
import { BiImageAlt as ImageIcon } from "react-icons/bi"
import { GrRotateLeft as ResetIcon } from "react-icons/gr"
import { getFieldContext } from "../../contexts/FieldContext"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"

const DEFAULT_MAPPING = {}

interface SelectOverlayProps {
  svgImage: ReactElement
  mapping?: Record<string, string>
}

export const SelectOverlay = ({ svgImage, mapping = DEFAULT_MAPPING }: SelectOverlayProps) => {
  const { useField } = getFieldContext<string[] | string | null>()
  const { value, onChange } = useField()

  const [open, setOpen] = useState(false)
  const [tooltipTitle, setTooltipTitle] = useState("")
  const [hoverTagName, setHoverTagName] = useState("")

  const { t } = useSiteTranslation()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    const optionId = target.parentElement?.id ? target.parentElement?.id : target.id
    const tagName = target.parentElement?.id ? target.parentElement.tagName : target.tagName
    setTooltipTitle(optionId || "")
    setHoverTagName(tagName || "")
  }

  const getCssId = (optionId: string) => mapping[optionId] || optionId

  const getOptionId = (cssId: string) =>
    Object.keys(mapping).find((optionId) => mapping[optionId] === cssId) || cssId

  const multiple = Array.isArray(value)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    const target = event.target as HTMLElement
    const cssId = target.parentElement?.id ? target.parentElement?.id : target.id
    if (cssId) {
      const optionId = getOptionId(cssId)
      if (multiple) {
        if (!Array.isArray(value)) {
          throw new Error("Value in multiple must be an array.")
        }
        const indexToRemove = value.indexOf(optionId)
        if (indexToRemove === -1) {
          onChange?.([...value, optionId])
        } else {
          onChange?.([...value.slice(0, indexToRemove), ...value.slice(indexToRemove + 1)])
        }
      } else {
        if (typeof value !== "string" && value !== null) {
          throw new Error("Value in single must be a string or null.")
        }
        if (optionId !== value) {
          onChange?.(optionId)
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
        values.map((optionId) => {
          const cssId = getCssId(optionId)
          const cssSelector = `& #${cssId}`
          return [cssSelector, cssClicked]
        })
      )
    }
    if (value) {
      const cssId = getCssId(value as string)
      const cssSelector = `& #${cssId}`
      return { [cssSelector]: cssClicked }
    }
    return {}
  }

  return (
    <>
      <Tooltip label={t("SelectOverlay.openGraphic")!} position="top" withArrow={false}>
        <ActionIcon onClick={handleClickOpen} sx={{ pointerEvents: "auto" }} size={20}>
          <ImageIcon />
        </ActionIcon>
      </Tooltip>
      <Modal
        opened={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "auto",
        }}
        size="80%"
      >
        <Tooltip
          label={tooltipTitle}
          withArrow
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
                maxHeight: "100%",
                cursor: "default",
              },
              [`& ${hoverTagName}[id]:hover`]: {
                fill: "orange",
                fillOpacity: 1,
                stroke: "",
                strokeWidth: "",
              },
              "& [id]": { cursor: "pointer" },
              "& text": { pointerEvents: "none" },
              ...selectedCss(),
            }}
          >
            {svgImage}
            <ActionIcon sx={{ position: "absolute", right: 8, bottom: 16 }}>
              <ResetIcon />
            </ActionIcon>
          </Box>
        </Tooltip>
      </Modal>
    </>
  )
}
