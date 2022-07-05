import { MantineProvider, ColorSchemeProvider } from "@mantine/core"
import { NotificationsProvider } from "@mantine/notifications"
import { useDarkMode } from "storybook-dark-mode"

export const parameters = { layout: "centered" }

const fontFamily =
  "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif"

const ThemeWrapper = (props: { children: React.ReactNode }) => {
  return (
    <ColorSchemeProvider colorScheme="light" toggleColorScheme={() => {}}>
      <MantineProvider
        theme={{
          colorScheme: useDarkMode() ? "dark" : "light",
          fontFamily,
          headings: { fontFamily },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>{props.children}</NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export const decorators = [(renderStory: Function) => <ThemeWrapper>{renderStory()}</ThemeWrapper>]
