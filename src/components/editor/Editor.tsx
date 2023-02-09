import { Box, Center, Portal, SegmentedControl } from "@mantine/core"
import { ReactNode, useState } from "react"
import {
  MdCode as SourceIcon,
  MdList as PropertiesIcon,
  MdRemoveRedEye as PreviewIcon,
} from "react-icons/md"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

interface EditorProps {
  properties: ReactNode
  codeEditor: ReactNode
  preview: ReactNode
}

export const Editor = ({ properties, codeEditor, preview }: EditorProps) => {
  const [currentView, setCurrentView] = useState("properties")
  const { t } = useSiteTranslation()

  return (
    <>
      <Portal target="#navbar-group">
        <SegmentedControl
          value={currentView}
          onChange={setCurrentView}
          data={[
            {
              value: "properties",
              label: (
                <Center>
                  <PropertiesIcon size={16} />
                  <Box ml={10}>{t("Editor.properties")}</Box>
                </Center>
              ),
            },
            {
              value: "sourceCode",
              label: (
                <Center>
                  <SourceIcon size={16} />
                  <Box ml={10}>{t("Editor.sourceCode")}</Box>
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
          ]}
        />
      </Portal>

      <Box display={currentView !== "properties" ? "none" : undefined} h="100%">
        {properties}
      </Box>

      <Box display={currentView !== "sourceCode" ? "none" : undefined} h="100%">
        {codeEditor}
      </Box>

      <Box display={currentView !== "preview" ? "none" : undefined} h="100%">
        {preview}
      </Box>
    </>
  )
}
