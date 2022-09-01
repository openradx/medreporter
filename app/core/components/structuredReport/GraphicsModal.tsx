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
  labels: { [value: string]: string }
  value: string | string[] | null
  onChange: (value: string | string[] | null) => void
  mapping?: { [value: string]: string }
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

  const getSvgId = (optionValue: string) => mapping[optionValue] || optionValue

  const getOptionValue = (svgId: string) =>
    Object.keys(mapping).find((optionValue) => mapping[optionValue] === svgId) || svgId

  const { t } = useSiteTranslation()

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    const svgId = target.parentElement?.id ? target.parentElement?.id : target.id
    const tagName = target.parentElement?.id ? target.parentElement.tagName : target.tagName

    const optionValue = getOptionValue(svgId)
    const label = labels[optionValue] ?? svgId
    setTooltipTitle(label || "")
    setHoverTagName(tagName || "")
  }

  const multiple = Array.isArray(value)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    const target = event.target as HTMLElement
    const svgId = target.parentElement?.id ? target.parentElement?.id : target.id
    if (svgId) {
      const optionValue = getOptionValue(svgId)
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
          const svgId = getSvgId(optionValue)
          const cssSelector = `& #${svgId}`
          return [cssSelector, cssClicked]
        })
      )
    }
    if (value) {
      const svgId = getSvgId(value as string)
      const cssSelector = `& #${svgId}`
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
          <ActionIcon
            title={t("GraphicsModal.button_title_reset")}
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
    </Modal>
  )
}
