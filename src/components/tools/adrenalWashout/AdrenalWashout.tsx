import { FreeTextField } from "../../fields/FreeTextField"
import { Module } from "../../structuredReport/Module"
import { Paragraph } from "../../structuredReport/Paragraph"
import { Report } from "../../structuredReport/Report"
import { Section } from "../../structuredReport/Section"
import { Statement } from "../../structuredReport/Statement"
import { Structure } from "../../structuredReport/Structure"
import { StructuredReport } from "../../structuredReport/StructuredReport"

export const AdrenalWashout = () => (
  <StructuredReport>
    <Section id="default">
      <Module id="adrenalWashout">
        <Structure title="Adrenal Washout">
          <FreeTextField id="foobar" label="Tell me" />
        </Structure>
        <Report>
          <Paragraph>
            <Statement fieldId="foobar">fooo</Statement>
          </Paragraph>
          <Paragraph>
            <Statement fieldId="foobar">bar</Statement>
          </Paragraph>
        </Report>
      </Module>
    </Section>
  </StructuredReport>
)
