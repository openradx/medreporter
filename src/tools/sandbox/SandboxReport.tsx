/* eslint-disable i18next/no-literal-string */
import { Paragraph } from "~/components/template/Paragraph"
import { Report } from "~/components/template/Report"
import { useStructureData } from "~/hooks/useStructureData"

type SandboxData = {
  date: Date | null
  number: number | null
  text: string | null
}

export const SandboxReport = () => {
  const { date, number, text } = useStructureData() as SandboxData

  return (
    <Report>
      <Paragraph>Today: {date?.toDateString()}</Paragraph>
      <Paragraph>Random number: {number}</Paragraph>
      <Paragraph>Some text: {text}</Paragraph>
    </Report>
  )
}
