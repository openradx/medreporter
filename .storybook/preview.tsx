import { MantineProvider, useMantineColorScheme } from "@mantine/core"
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import { addons } from "@storybook/preview-api"
import React, { useEffect } from "react"
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode"
import { theme } from "../src/theme"

const channel = addons.getChannel()

function ColorSchemeWrapper({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useMantineColorScheme()

  useEffect(() => {
    const handleColorScheme = (value: boolean) => setColorScheme(value ? "dark" : "light")
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme)
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme)
  }, [setColorScheme])

  return <>{children}</>
}

export const decorators = [
  (renderStory: any) => <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>,
  (renderStory: any) => <MantineProvider theme={theme}>{renderStory()}</MantineProvider>,
]
