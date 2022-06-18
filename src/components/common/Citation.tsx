import { Box, Text } from "@mantine/core"

interface CitationProps {
  title: string
  authors: string
  journal: string
}

export const Citation = ({ title, authors, journal }: CitationProps) => (
  <Box>
    <Text>{title}</Text>
    <Text>{authors}</Text>
    <Text>{journal}</Text>
  </Box>
)
