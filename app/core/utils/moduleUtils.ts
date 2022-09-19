import { StructuredReportLanguage } from "types"

const multilingualModuleDraft = `
<Module title={$t("module_title")} defaultLanguage="%language">
  <Structure>
    <Finding id="example_finding">
      <FreeTextField id="example_field" label={$t("label_example")}/>
    </Finding>
  </Structure>
  <Report>
    <Statement>{$d("example_field")}</Statement>
  </Report>
  <Translations>
    <Language code="%language">
      <T key="module_title">%name</T>
      <T key="label_example">%example</T>
    </Language>
  </Translations>
</Module>
`

const monolingualModuleDraft = `
<Module title="%name" defaultLanguage="%language">
  <Structure>
    <Finding id="example_finding">
      <FreeTextField id="example_field" label="%example"/>
    </Finding>
  </Structure>
  <Report>
    <Statement>{$d("example_field")}</Statement>
  </Report>
</Module>
`

type ExampleLanguage = Exclude<StructuredReportLanguage, "cimode" | "asSite">

const examples: { [language in ExampleLanguage]: string } = {
  other: "Example",
  de: "Beispiel",
  en: "Example",
  "en-US": "Example",
  es: "Ejemplo",
  fr: "Exemple",
  it: "Esempio",
  nl: "Voorbeeld",
  pt: "Exemplo",
  sv: "Exempel",
}

export const createModuleDraft = (
  name: string,
  multilingual: boolean,
  language: ExampleLanguage
): string => {
  if (multilingual === true) {
    return multilingualModuleDraft
      .replace("%name", name)
      .replace("%language", language)
      .replace("%example", examples[language])
      .trim()
  }
  return monolingualModuleDraft
    .replace("%name", name)
    .replace("%language", language)
    .replace("%example", examples[language])
    .trim()
}
