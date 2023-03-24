import { ColorSchemeProvider, MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import React from "react"
import { useMemo } from "react"

export const parameters = { layout: "padded" }

const fontFamily =
  "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif"

// Inspired by https://storybook.js.org/blog/material-ui-in-storybook/
export const globalTypes = {
  theme: {
    name: "Theme",
    title: "Theme",
    description: "Theme for your components",
    defaultValue: "light",
    toolbar: {
      icon: "paintbrush",
      dynamicTitle: true,
      items: [
        { value: "light", left: "☀️", title: "Light mode" },
        { value: "dark", left: "🌙", title: "Dark mode" },
      ],
    },
  },
}

const THEMES = {
  light: "light",
  dark: "dark",
}

const withMantineTheme = (Story, context) => {
  const { theme: themeKey } = context.globals

  const theme = useMemo(() => THEMES[themeKey] || THEMES["light"], [themeKey])

  return (
    <ColorSchemeProvider colorScheme="light" toggleColorScheme={() => {}}>
      <MantineProvider
        theme={{
          colorScheme: theme,
          cursorType: "pointer",
          fontFamily,
          headings: { fontFamily },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications />
        <Story />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export const decorators = [withMantineTheme]
