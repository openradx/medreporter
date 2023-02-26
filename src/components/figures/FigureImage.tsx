import { Box, Tooltip } from "@mantine/core"
import { Dispatch, SetStateAction, useRef } from "react"

interface FigureImageProps {
  svg: string
  options: { [id: string]: string }
  hoveredId: string | null
  selectedIds: string[]
  setHoveredId: Dispatch<SetStateAction<string | null>>
  onClicked: (id: string) => void
}

export const FigureImage = ({
  svg,
  options,
  hoveredId,
  selectedIds,
  setHoveredId,
  onClicked,
}: FigureImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const getId = (el: Element): string | null => {
    const id = el.getAttribute("id")
    if (id && id in options) return id
    if (el === containerRef.current) return null
    return getId(el.parentElement!)
  }

  const floatingLabel = hoveredId && options[hoveredId]

  return (
    <Tooltip.Floating label={floatingLabel} className="yyy">
      <Box
        h="100%"
        onMouseMove={(event) => {
          const target = event.target as Element
          setHoveredId(getId(target))
        }}
        onMouseLeave={() => setHoveredId(null)}
        onClick={(event) => {
          const target = event.target as Element
          const id = getId(target)
          if (id) onClicked(id)
        }}
        sx={{
          "& svg": { display: "inline-block", width: "100%", height: "100%" },
          [`& svg #${hoveredId}`]: { cursor: "pointer", fill: "orange", fillOpacity: 1 },
          ...Object.fromEntries(
            selectedIds.map((selectedId) => [`& #${selectedId}`, { fill: "red", fillOpacity: 1 }])
          ),
        }}
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </Tooltip.Floating>
  )
}
