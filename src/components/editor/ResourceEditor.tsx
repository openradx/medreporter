import { Box, Center, SegmentedControl } from "@mantine/core"
import { ReactNode, useState } from "react"
import {
  MdCode as SourceIcon,
  MdList as PropertiesIcon,
  MdRemoveRedEye as PreviewIcon,
} from "react-icons/md"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NavbarActions } from "../common/NavbarActions"

interface ResourceEditorProps {
  properties: ReactNode
  codeEditor: ReactNode
  preview: ReactNode
}

export const ResourceEditor = ({ properties, codeEditor, preview }: ResourceEditorProps) => {
  const [currentView, setCurrentView] = useState("properties")
  const { t } = useSiteTranslation()

  return (
    <>
      <NavbarActions>
        <SegmentedControl
          value={currentView}
          onChange={setCurrentView}
          data={[
            {
              value: "properties",
              label: (
                <Center>
                  <PropertiesIcon size={16} />
                  <Box ml={10}>{t("ResourceEditor.general")}</Box>
                </Center>
              ),
            },
            {
              value: "sourceCode",
              label: (
                <Center>
                  <SourceIcon size={16} />
                  <Box ml={10}>{t("ResourceEditor.sourceCode")}</Box>
                </Center>
              ),
            },
            {
              value: "preview",
              label: (
                <Center>
                  <PreviewIcon size={16} />
                  <Box ml={10}>{t("ResourceEditor.preview")}</Box>
                </Center>
              ),
            },
          ]}
        />
      </NavbarActions>

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
