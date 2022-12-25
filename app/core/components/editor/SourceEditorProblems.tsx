import { ActionIcon, Box, Center, Collapse, Flex, List, Stack } from "@mantine/core"
import { useEffect, useState } from "react"
import {
  MdCheck as OkIcon,
  MdKeyboardArrowUp as ChevronIcon,
  MdWarning as ErrorIcon,
} from "react-icons/md"
import { monaco } from "react-monaco-editor"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"

interface SourceProblemsPanelProps {
  editor?: monaco.editor.IStandaloneCodeEditor
}

export const SourceProblemsPanel = ({ editor }: SourceProblemsPanelProps) => {
  const [expanded, setExpanded] = useState(false)
  const [markers, setMarkers] = useState<monaco.editor.IMarker[]>([])
  const { t } = useSiteTranslation()

  useEffect(() => {
    const disposable = monaco.editor.onDidChangeMarkers(([resource]) =>
      setMarkers(monaco.editor.getModelMarkers({ resource }))
    )
    return () => disposable.dispose()
  }, [])

  return (
    <Stack
      px="xs"
      py={4}
      sx={(theme) => ({
        borderTop: `1px solid ${
          theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
        }`,
      })}
      spacing={4}
    >
      <Flex justify="space-between">
        {markers.length === 0 && (
          <Center>
            <OkIcon />
            <Box ml={10}>{t("SourceProblemsPanel.noProblemsFound")}</Box>
          </Center>
        )}
        {markers.length > 0 && (
          <Center>
            <ErrorIcon />
            <Box ml={10}>{t("SourceProblemsPanel.problemsFound", { count: markers.length })}</Box>
          </Center>
        )}
        <ActionIcon onClick={() => setExpanded((v) => !v)}>
          <Box
            sx={{
              transition: "transform 500ms ease",
              transform: expanded ? "rotate(180deg)" : undefined,
            }}
          >
            <ChevronIcon size={18} />
          </Box>
        </ActionIcon>
      </Flex>
      <Collapse in={expanded}>
        <List sx={{ maxHeight: "200px" }}>
          {markers.map((marker, index) => (
            <List.Item
              key={index}
              onClick={() => {
                editor?.setPosition({
                  lineNumber: marker.startLineNumber,
                  column: marker.startColumn,
                })
                editor?.focus()
              }}
            >
              {marker.message}
            </List.Item>
          ))}
        </List>
      </Collapse>
    </Stack>
  )
}
