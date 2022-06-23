import { FreeTextField } from "../../fields/FreeTextField"
import { Conclusion } from "../../structuredReport/Conclusion"
import { Conclusions } from "../../structuredReport/Conclusions"
import { Module } from "../../structuredReport/Module"
import { Paragraph } from "../../structuredReport/Paragraph"
import { Report } from "../../structuredReport/Report"
import { Section } from "../../structuredReport/Section"
import { Statement } from "../../structuredReport/Statement"
import { Structure } from "../../structuredReport/Structure"
import { StructuredReport } from "../../structuredReport/StructuredReport"

export const Fleischner2017 = () => (
  <StructuredReport>
    <Section id="fleischner2017">
      <Module id="fleischner2017">
        <Structure title="Fleischner 2017">
          <FreeTextField id="foobar" label="Tell me" />
        </Structure>
        <Report>
          <Paragraph>
            <Statement fieldId="foobar">fooo1.</Statement>
            <Statement fieldId="foobar">fooo2.</Statement>
            <Statement fieldId="foobar">fooo3.</Statement>
          </Paragraph>
          <Paragraph>
            <Statement fieldId="foobar">bar</Statement>
          </Paragraph>
        </Report>
      </Module>
    </Section>
    <Conclusions>
      <Conclusion>slkjdflkds</Conclusion>
    </Conclusions>
  </StructuredReport>
)
