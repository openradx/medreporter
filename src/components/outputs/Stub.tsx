import { OutputFormat } from "~/types/general"

interface StubProps {
  format?: OutputFormat
  styling?: boolean
}

export const Stub = ({ format, styling = true }: StubProps) => {
  const stub = "..."
  if (format === "html" && styling) {
    return <b>{stub}</b>
  }

  return <>{stub}</>
}
