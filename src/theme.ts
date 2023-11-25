import { createTheme } from "@mantine/core"

const fontFamily =
  "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif"

export const theme = createTheme({
  cursorType: "pointer",
  fontFamily,
  headings: {
    fontFamily,
  },
})
