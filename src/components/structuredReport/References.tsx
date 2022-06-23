import { Box, Text } from "@mantine/core"
import { ReactNode } from "react"
import { useReportTranslation } from "../../hooks/useReportTranslation"

interface ReferencesProps {
  children?: ReactNode
}

export const References = ({ children }: ReferencesProps) => {
  const { t } = useReportTranslation()

  return (
    <Box
      sx={(theme) => ({
        paddingTop: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.xs,
      })}
    >
      <Text weight="bold">{t("References.title")}:</Text>
      {children}
    </Box>
  )
}
