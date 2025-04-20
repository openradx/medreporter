import { useLingui, Trans } from "@lingui/react/macro"
import { Alert } from "@mantine/core"

interface QueryErrorProps {
  message?: string
}

export const QueryError = ({ message }: QueryErrorProps) => {
  const { t } = useLingui()

  const reason = message ? `: ${message}` : "."

  return (
    <Alert title={t`Data fetching error`} color="red">
      <Trans>An unexpected error occurred during data fetching{reason}</Trans>
    </Alert>
  )
}
