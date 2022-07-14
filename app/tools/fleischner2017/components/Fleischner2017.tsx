import { FreeTextField } from "../../../core/components/fields/FreeTextField"
import { Conclusion } from "../../../core/components/structuredReport/Conclusion"
import { Conclusions } from "../../../core/components/structuredReport/Conclusions"
import { Module } from "../../../core/components/structuredReport/Module"
import { Paragraph } from "../../../core/components/structuredReport/Paragraph"
import { Report } from "../../../core/components/structuredReport/Report"
import { Section } from "../../../core/components/structuredReport/Section"
import { Statement } from "../../../core/components/structuredReport/Statement"
import { Structure } from "../../../core/components/structuredReport/Structure"
import { StructuredReport } from "../../../core/components/structuredReport/StructuredReport"

export const Fleischner2017 = () => (
  <StructuredReport>
    <Section id="fleischner2017">
      <Module id="fleischner2017" title="Fleischner 2017">
        <Structure>
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
