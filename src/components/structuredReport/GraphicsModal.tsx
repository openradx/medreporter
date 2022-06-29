import { ActionIcon, Box, Modal, Tooltip } from "@mantine/core"
import { MouseEvent, ReactElement, useState } from "react"
import { GrRotateLeft as ResetIcon } from "react-icons/gr"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"

const DEFAULT_MAPPING = {}

interface GraphicsModalProps {
  title: string
  opened: boolean
  onClose: () => void
  svg: ReactElement
  labels: { [optionId: string]: string }
  value: string | string[] | null
  onChange: (value: string | string[] | null) => void
  mapping?: Record<string, string>
}

export const GraphicsModal = ({
  title,
  opened,
  onClose,
  svg,
  labels,
  value,
  onChange,
  mapping = DEFAULT_MAPPING,
}: GraphicsModalProps) => {
  const [tooltipTitle, setTooltipTitle] = useState("")
  const [hoverTagName, setHoverTagName] = useState("")

  const { t } = useSiteTranslation()

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    const optionId = target.parentElement?.id ? target.parentElement?.id : target.id
    const tagName = target.parentElement?.id ? target.parentElement.tagName : target.tagName
    const label = labels[optionId] ?? optionId
    setTooltipTitle(label || "")
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
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "auto",
      }}
      size="80%"
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
          {svg}
          <Tooltip label={t("SelectOverlay.reset")!}>
            <ActionIcon
              onClick={(event: { stopPropagation: () => void }) => {
                event.stopPropagation()
                onChange?.(multiple ? [] : null)
              }}
              sx={{ position: "absolute", right: 8, bottom: 16 }}
            >
              <ResetIcon />
            </ActionIcon>
          </Tooltip>
        </Box>
      </Tooltip.Floating>
    </Modal>
  )
}
