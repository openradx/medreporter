import { Alert, Box, Center, Loader, Portal, SegmentedControl } from "@mantine/core"
import dynamic from "next/dynamic"
import { useState } from "react"
import {
  MdCode as SourceIcon,
  MdRemoveRedEye as PreviewIcon,
  MdSettings as SettingsIcon,
} from "react-icons/md"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { ModulePreview } from "./ModulePreview"

const SourceEditor = dynamic(() => import("./SourceEditor"), {
  loading: ({ isLoading, error }) => {
    if (isLoading) {
      return (
        <Center h="100%">
          <Loader variant="bars" size="lg" />
        </Center>
      )
    }

    if (error) {
      return <Alert>{error.message}</Alert>
    }

    return null
  },
  ssr: false,
})

export const Editor = () => {
  const [currentView, setCurrentView] = useState("source")
  const { t } = useSiteTranslation()

  return (
    <>
      <Portal target="#navbar-group">
        <SegmentedControl
          value={currentView}
          onChange={setCurrentView}
          data={[
            {
              value: "source",
              label: (
                <Center>
                  <SourceIcon size={16} />
                  <Box ml={10}>{t("Editor.source")}</Box>
                </Center>
              ),
            },
            {
              value: "preview",
              label: (
                <Center>
                  <PreviewIcon size={16} />
                  <Box ml={10}>{t("Editor.preview")}</Box>
                </Center>
              ),
            },
            {
              value: "settings",
              label: (
                <Center>
                  <SettingsIcon size={16} />
                  <Box ml={10}>{t("Editor.settings")}</Box>
                </Center>
              ),
            },
          ]}
        />
      </Portal>

      <Box display={currentView !== "source" ? "none" : undefined} h="100%">
        <SourceEditor />
      </Box>

      <Box display={currentView !== "preview" ? "none" : undefined}>
        <ModulePreview />
      </Box>

      <Box display={currentView !== "settings" ? "none" : undefined}>Settings</Box>
    </>
  )
}
