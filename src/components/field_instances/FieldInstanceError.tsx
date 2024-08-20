import { Box } from "@mantine/core"

interface FieldInstanceErrorProps {
  error: Error
}

export const FieldInstanceError = ({ error }: FieldInstanceErrorProps) => (
  <Box>
    <p>{error.message}</p>
  </Box>
)
