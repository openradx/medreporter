import { Alert, Box, Center, Portal, SegmentedControl } from "@mantine/core"
import dynamic from "next/dynamic"
import { useState } from "react"
import {
  MdCode as CodeIcon,
  MdRemoveRedEye as PreviewIcon,
  MdSettings as SettingsIcon,
} from "react-icons/md"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { Loading } from "../common/Loading"

const CodeEditor = dynamic(() => import("./CodeEditor"), {
  loading: ({ isLoading, error }) => {
    if (isLoading) {
      return <Loading />
    }

    if (error) {
      return <Alert>{error.message}</Alert>
    }

    return null
  },
  ssr: false,
})

export const Editor = () => {
  const [value, setValue] = useState("code")
  const { t } = useSiteTranslation()

  return (
    <>
      <Portal target="#navbar-group">
        <SegmentedControl
          value={value}
          onChange={setValue}
          data={[
            {
              value: "code",
              label: (
                <Center>
                  <CodeIcon size={16} />
                  <Box ml={10}>{t("Editor.code")}</Box>
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

      <Box display={value !== "code" ? "none" : undefined} h="100%">
        <CodeEditor />
      </Box>

      <Box display={value !== "preview" ? "none" : undefined}>Preview</Box>

      <Box display={value !== "settings" ? "none" : undefined}>Settings</Box>
    </>
  )
}
