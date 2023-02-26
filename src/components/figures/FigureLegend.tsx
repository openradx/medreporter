import { Box, Center, Collapse, Flex, List } from "@mantine/core"
import { Dispatch, SetStateAction, useState } from "react"
import { MdChevronLeft as ExpandIcon, MdChevronRight as CollapseIcon } from "react-icons/md"

interface FigureLegendProps {
  options: { [id: string]: string }
  hoveredId: string | null
  selectedIds: string[]
  setHoveredId: Dispatch<SetStateAction<string | null>>
  onClicked: (id: string) => void
}

export const FigureLegend = ({
  options,
  hoveredId,
  selectedIds,
  setHoveredId,
  onClicked,
}: FigureLegendProps) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Flex h="100%" gap="xs">
      <Box
        w={20}
        display="flex"
        sx={{ border: "1px dashed black", cursor: "pointer" }}
        onClick={() => setCollapsed((value) => !value)}
      >
        <Center>
          {collapsed && <ExpandIcon />}
          {!collapsed && <CollapseIcon />}
        </Center>
      </Box>
      <Box h="100%" sx={{ overflowY: collapsed ? "hidden" : "auto" }}>
        <Collapse in={!collapsed}>
          <List listStyleType="none">
            {Object.entries(options).map(([id, label]) => (
              <List.Item
                key={id}
                sx={{
                  cursor: "pointer",
                  backgroundColor: selectedIds.includes(id)
                    ? "red"
                    : id === hoveredId
                    ? "orange"
                    : undefined,
                }}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onClicked(id)}
              >
                {label}
              </List.Item>
            ))}
          </List>
        </Collapse>
      </Box>
    </Flex>
  )
}
