import { Alert } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

interface QueryErrorProps {
  message?: string
}

export const QueryError = ({ message }: QueryErrorProps) => {
  const { t } = useSiteTranslation()

  const reason = message ? `: ${message}` : "."

  return (
    <Alert title={t("QueryError.title")} color="red">
      {t("QueryError.message") + reason}
    </Alert>
  )
}
