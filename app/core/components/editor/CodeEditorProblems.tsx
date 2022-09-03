import { Box, List, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import { MdWarning as CodeErrorIcon, MdCheck as NoCodeErrorIcon } from "react-icons/md"
import { monaco } from "react-monaco-editor"
import { useSiteTranslation } from "../../hooks/useSiteTranslation"

interface CodeEditorProblemsProps {
  editor?: monaco.editor.IStandaloneCodeEditor
}

export const CodeEditorProblems = ({ editor }: CodeEditorProblemsProps) => {
  const { t } = useSiteTranslation()
  const [markers, setMarkers] = useState<monaco.editor.IMarker[]>([])

  useEffect(() => {
    const disposable = monaco.editor.onDidChangeMarkers(([resource]) => {
      const _markers = monaco.editor.getModelMarkers({ resource })
      setMarkers(_markers)
    })
    return () => disposable.dispose()
  }, [])

  return (
    <Box
      p="xs"
      sx={(theme) => ({
        borderTop: `1px solid ${
          theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
        }`,
      })}
    >
      <Text>{t("CodeProblems.titleCodeProblems")}</Text>
      <List
        sx={{
          maxHeight: "125px",
          overflow: "auto",
          bgcolor: "inherit",
          backgroundImage: "inherit",
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        {markers.map((marker, index) => (
          <List.Item
            key={index}
            sx={{ py: 0 }}
            icon={<CodeErrorIcon />}
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

        {markers.length === 0 && (
          <List.Item sx={{ py: 0 }} icon={<NoCodeErrorIcon />}>
            {t("CodeProblems.titleNoCodeProblems")}
          </List.Item>
        )}
      </List>
    </Box>
  )
}
