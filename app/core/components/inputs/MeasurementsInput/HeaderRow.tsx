import { Box } from "@mantine/core"

const PREVIOUS_SIGN = "^"
const CURRENT_SIGN = "*"

interface HeaderRowProps {
  labels: {
    location: string
    reference: string
  }
  followUp: boolean
  dimensions: 1 | 2 | 3
}

export const HeaderRow = ({ labels, followUp, dimensions }: HeaderRowProps) => (
  <Box component="tr" sx={{ textAlign: "center" }}>
    <th />
    {followUp && <th>X{PREVIOUS_SIGN}</th>}
    {followUp && dimensions > 1 && <th>Y{PREVIOUS_SIGN}</th>}
    {followUp && dimensions > 2 && <th>Z{PREVIOUS_SIGN}</th>}
    <th>X{followUp && CURRENT_SIGN}</th>
    {dimensions > 1 && <th>Y{followUp && CURRENT_SIGN}</th>}
    {dimensions > 2 && <th>Z{followUp && CURRENT_SIGN}</th>}
    <th>{labels.location}</th>
    <th>{labels.reference}</th>
  </Box>
)