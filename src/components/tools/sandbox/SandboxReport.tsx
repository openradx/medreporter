import { Citation } from "~/components/common/Citation"
import { Paragraph } from "~/components/sr/Paragraph"
import { Statement } from "~/components/sr/Statement"
import { useReportData } from "~/contexts/ReportDataContext"

type SandboxData = {
  date: Date | null
  number: number | null
  arteries: string | null
  bones_feet: string[] | null
  text: string | null
}

export const SandboxReport = () => {
  const { date, number, arteries, bones_feet, text } = useReportData(true) as SandboxData

  const conclusion = ""

  return (
    <>
      <Paragraph>Today {date?.toDateString()}</Paragraph>
      <Paragraph>Random number: {number}</Paragraph>
      <Paragraph>Selected artery: {arteries}</Paragraph>
      <Paragraph>Selected bones: {bones_feet}</Paragraph>
      <Paragraph>Some text: {text}</Paragraph>
      {conclusion}
      <Citation
        title="Technical and Interpretive Pitfalls in Adrenal Imaging"
        authors="Gurinder Nandra, Oliver Duxbury, Pawan Patel, Jaymin H. Patel, Nirav Patel, and Ioannis Vlahos"
        journal="RadioGraphics 2020 40:4, 1041-1060"
      />
      <Paragraph>
        <Statement fieldId="foobar">fooo</Statement>
      </Paragraph>
      <Paragraph>
        <Statement fieldId="foobar">bar</Statement>
      </Paragraph>
    </>
  )
}
