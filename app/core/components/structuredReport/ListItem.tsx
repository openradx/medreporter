import { ReactNode } from "react"
import { selectReportFormat } from "../../state/displaySlice"
import { useAppSelector } from "../../state/store"

interface ListItemProps {
  children?: ReactNode
}

export const ListItem = ({ children }: ListItemProps) => {
  const reportFormat = useAppSelector(selectReportFormat)

  if (reportFormat === "text") {
    return (
      <>
        - {children}
        {"\n"}
      </>
    )
  }

  // html
  return <li>{children}</li>
}
