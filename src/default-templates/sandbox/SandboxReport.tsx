/* eslint-disable i18next/no-literal-string */
import { Paragraph } from "~/components/template/Paragraph"
import { Report } from "~/components/template/Report"
import { useStructureData } from "~/hooks/useStructureData"

type SandboxData = {
  today: string | null
  number: number | null
  text: string | null
}

export const SandboxReport = () => {
  const { today, number, text } = useStructureData() as SandboxData

  return (
    <Report>
      <Paragraph>Today: {today ? new Date(today).toLocaleDateString() : null}</Paragraph>
      <Paragraph>Random number: {number}</Paragraph>
      <Paragraph>Some text: {text}</Paragraph>
    </Report>
  )
}
