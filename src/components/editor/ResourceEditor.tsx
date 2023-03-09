import { Box, Center, SegmentedControl } from "@mantine/core"
import { ReactNode, useState } from "react"
import {
  MdCode as SourceIcon,
  MdList as GeneralIcon,
  MdRemoveRedEye as PreviewIcon,
} from "react-icons/md"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { NavbarActions } from "../common/NavbarActions"

interface ResourceEditorProps {
  general: ReactNode
  source: ReactNode
  preview: ReactNode
}

export const ResourceEditor = ({ general, source, preview }: ResourceEditorProps) => {
  const [currentView, setCurrentView] = useState<"general" | "source" | "preview">("general")
  const { t } = useSiteTranslation()

  return (
    <>
      <NavbarActions>
        <SegmentedControl
          value={currentView}
          onChange={(value) => setCurrentView(value as any)}
          data={[
            {
              value: "general",
              label: (
                <Center>
                  <GeneralIcon size={16} />
                  <Box ml={10}>{t("ResourceEditor.general")}</Box>
                </Center>
              ),
            },
            {
              value: "source",
              label: (
                <Center>
                  <SourceIcon size={16} />
                  <Box ml={10}>{t("ResourceEditor.source")}</Box>
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

      <Box display={currentView !== "general" ? "none" : undefined} h="100%">
        {general}
      </Box>

      <Box display={currentView !== "source" ? "none" : undefined} h="100%">
        {source}
      </Box>

      <Box display={currentView !== "preview" ? "none" : undefined} h="100%">
        {preview}
      </Box>
    </>
  )
}
