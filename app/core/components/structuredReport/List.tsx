import { ReactNode } from "react"
import { selectReportFormat } from "../../state/displaySlice"
import { useAppSelector } from "../../state/store"

interface ListProps {
  children?: ReactNode
}

export const List = ({ children }: ListProps) => {
  const reportFormat = useAppSelector(selectReportFormat)

  if (reportFormat === "text") {
    return <>{children}</>
  }

  // html
  return <ul>{children}</ul>
}
