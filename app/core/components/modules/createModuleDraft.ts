const multilingualModuleDraft = `
<Module title={$trans("module_title")}>
  <Structure>
    <Finding id="example_finding">
      <FreeTextField id="example_field" label={$trans("label_example")}/>
    </Finding>
  </Structure>
  <Report>
    <Paragraph>{$data("example_field"}</Paragraph>
  </Report>
  <Translations>
    <Language lng="%language">
      <T key="module_title">%name</T>
      <T key="label_example">%example</T>
    <Language>
  </Translations>
</Module>
  `
const monolingualModuleDraft = `
<Module title="%name">
  <Structure>
    <Finding id="example_finding">
      <FreeTextField id="example_field" label="%example"/>
    </Finding>
  </Structure>
  <Report>
    <Paragraph>{$data("example_field"}</Paragraph>
  </Report>
</Module>
  `
const examples = {
  gb: "Example",
  de: "Beispiel",
  fr: "Exemple",
  se: "Exempel",
  es: "Ejemplo",
  it: "Esempio",
  pt: "Exemplo",
  nl: "Voorbeeld",
}

export const createModuleDraft = (
  name: string,
  multilingual: boolean,
  language: "de" | "gb" | "fr" | "se" | "it" | "es" | "nl" | "pt"
): string => {
  if (multilingual === true) {
    return multilingualModuleDraft
      .replace("%name", name)
      .replace("%language", language)
      .replace("%example", examples[language])
  }
  return monolingualModuleDraft.replace("%name", name).replace("%example", examples[language])
}
