import React, { ReactNode } from "react"
import { OutputFormat } from "~/state/displaySlice"

interface TextProps {
  format?: OutputFormat
  bold?: boolean
  italic?: boolean
  children?: ReactNode
}
export const Text = ({ format, bold, italic, children }: TextProps) => {
  let component = <>{children}</>

  if (format === "plain") {
    return component
  }

  if (italic) {
    component = <i>{component}</i>
  }

  if (bold) {
    component = <b>{component}</b>
  }

  return component
}
