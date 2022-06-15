import { FreeTextField } from "../../fields/FreeTextField"
import { Module } from "../../structuredReport/Module"
import { Report } from "../../structuredReport/Report"
import { Section } from "../../structuredReport/Section"
import { Structure } from "../../structuredReport/Structure"
import { StructuredReport } from "../../structuredReport/StructuredReport"

export const Fleischner2017 = () => (
  <StructuredReport>
    <Section id="default" title="Default">
      <Module name="fleischner2017" id="fleischner2017" title="Fleischner 2017">
        <Structure>
          <FreeTextField id="foobar" label="Tell me" />
        </Structure>
        <Report>
          {/* <Paragraph title="Default">
            <Statement fieldId="foobar">fooo</Statement>
          </Paragraph> */}
        </Report>
      </Module>
    </Section>
    {/* <Conclusions>
      <Conclusion moduleId="" fieldId="">
        lkjdsflk
      </Conclusion>
    </Conclusions> */}
  </StructuredReport>
)
