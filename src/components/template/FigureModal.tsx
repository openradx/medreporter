import { useLingui } from "@lingui/react/macro"
import { ActionIcon, Box, Flex, Modal, Tooltip } from "@mantine/core"
import { RotateCcw as ResetIcon } from "lucide-react"
import { MouseEvent, useState } from "react"
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

  const { t } = useLingui()

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
          throw new Error(t`Value in multiple must be an array.`)
        }
        const indexToRemove = value.indexOf(optionValue)
        if (indexToRemove === -1) {
          onChange?.([...value, optionValue])
        } else {
          onChange?.([...value.slice(0, indexToRemove), ...value.slice(indexToRemove + 1)])
        }
      } else {
        if (typeof value !== "string" && value !== null) {
          throw new Error(t`Value in single must be a string or null.`)
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
      <Flex
        align="center"
        justify="center"
        style={{
          pointerEvents: "auto",
        }}
      >
        <Tooltip.Floating
          label={tooltipTitle}
          position="top"
          style={{ visibility: tooltipTitle ? "visible" : "hidden" }}
        >
          <Box
            onMouseMove={handleMouseMove}
            onClick={handleClick}
            style={{
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
              title={t`Reset selection`}
              onClick={(event: { stopPropagation: () => void }) => {
                event.stopPropagation()
                onChange?.(multiple ? [] : null)
              }}
              pos="absolute"
              right={8}
              bottom={16}
            >
              <ResetIcon />
            </ActionIcon>
          </Box>
        </Tooltip.Floating>
      </Flex>
    </Modal>
  )
}
