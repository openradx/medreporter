import { ActionIcon, Box, Flex, Group, Stack, Text } from "@mantine/core"
import { useState } from "react"
import { BiReset as ResetIcon } from "react-icons/bi"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { ResourceState } from "~/state/resourcesSlice"
import { SupportedLanguage } from "~/types/general"
import { FigureDocument } from "~/types/resources"
import { translateMetadata } from "~/utils/figureUtils"
import { LanguageChooser } from "../common/LanguageChooser"
import { FigureImage } from "./FigureImage"
import { FigureLegend } from "./FigureLegend"

const DEFAULT_SELECTED_IDS: string[] = []

interface FigureShowcaseProps {
  figure: ResourceState
  defaultLng?: SupportedLanguage
  selectionMode?: "single" | "multi"
  defaultSelectedIds?: string[]
  onSelectionChanged?: (selectedIds: string[]) => void
}

export const FigureShowcase = ({
  figure,
  defaultLng = "en",
  selectionMode = "single",
  defaultSelectedIds = DEFAULT_SELECTED_IDS,
  onSelectionChanged,
}: FigureShowcaseProps) => {
  const { t } = useSiteTranslation()

  const [lng, setLng] = useState<SupportedLanguage>(defaultLng)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelectedIds)

  const { svg, meta } = figure.document as FigureDocument
  const tMeta = translateMetadata(meta, lng)

  const title = tMeta.title ?? "Untitled"
  const options = tMeta.options ?? {}

  const handleClicked = (id: string) => {
    const idx = selectedIds.indexOf(id)
    if (selectionMode === "single") {
      const newValue = idx !== -1 ? [] : [id]
      setSelectedIds(newValue)
      onSelectionChanged?.(newValue)
    } else if (selectionMode === "multi") {
      const newValue =
        idx !== -1
          ? [...selectedIds.slice(0, idx), ...selectedIds.slice(idx + 1)]
          : [...selectedIds, id]
      setSelectedIds(newValue)
      onSelectionChanged?.(newValue)
    }
  }

  return (
    <Flex h="100%">
      <Flex direction="column" sx={{ flex: 1 }}>
        <Group position="apart">
          <Group>
            <Text weight="bold">{title}</Text>
            <ActionIcon
              title={t("FigureShowcase.resetSelectionTitle")}
              variant="transparent"
              onClick={() => setSelectedIds([])}
            >
              <ResetIcon size={22} />
            </ActionIcon>
          </Group>
          <LanguageChooser
            actionTitle={t("FigureShowcase.languageChooserTitle")}
            currentLanguage={lng}
            supportedLanguages={meta.lngs as SupportedLanguage[]}
            onLanguageChanged={(value) => setLng(value)}
            disableDebugMode
          />
        </Group>
        <Box sx={{ flex: 1, minHeight: 0 }}>
          <FigureImage
            {...{ svg, options, hoveredId, selectedIds, setHoveredId }}
            onClicked={handleClicked}
          />
        </Box>
      </Flex>
      <FigureLegend
        {...{ options, hoveredId, selectedIds, setHoveredId }}
        onClicked={handleClicked}
      />
    </Flex>
  )
}
