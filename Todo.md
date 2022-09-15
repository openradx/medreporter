# Todo

## Kai

- LanguageChooser => LocaleChooser
- Modules: Show deprecated, Only starred, Add tags, Sort by [Title, Author, Creation date], only language
- switch to npm
- rename i18n keys to snake case with function, e.g. button_xxx, link_xxx, text_xxx
- check where useMemo is really needed
- Add https://github.com/edvardchen/eslint-plugin-i18next
- MeasurementsTable -> MeasurementsTool
- PageHeader -> NavBar
- PanelHeader -> PanelToolbar
- AccountControl -> AccountOptions
- ...Button -> ...Action (e.g. UndoButton -> UndoAction)
- Make Measurements field smaller
- Make Measurments output nice
- Maybe rename useReportData to useReportOutput
- configurable gap after paragraph
- Wrap modules in error boundaries from Blitz
- Text / HTML export
- [Tools] ILD Classification
- [MeasurementTable] Allow to import table
- Bring in modules and templates (MedTL)
- Table component
- Jest tests are currently --runInBand because of the database interactions, maybe switch to mocking the database or Docker base integration tests (see https://www.prisma.io/docs/guides/testing/unit-testing and https://www.prisma.io/docs/guides/testing/integration-testing)
- Switch from Blitz to tRPC and iron-session
  -- https://dev.to/fcpauldiaz/nextjs-full-example-of-next-iron-session-1019
- Maybe use Typesense for full text search https://typesense.org/docs/0.23.1/api/api-clients.html#libraries
  -- Ranking / Weights are easier than with PostgreSQL or Mysql
- Locale vs Language
  -- https://www.rfc-editor.org/rfc/rfc3066
  -- https://www.rfc-editor.org/rfc/rfc5646.html
  -- https://www.w3.org/International/articles/language-tags/

## Julia

- MedReporter Logo
- Lung arteries image
- Startpage (ideas)
- Main Page
- Collapse report panel
- Field extras
- External link images (Next.js Image component, why?)
- [Tools] Fleischner 2017
- [Tools] Adrenal washout
- [Tools] Adrenal MRI Calculator (SI-Index)
- [Tools] Lung RADS
- [Tools] Kidney volume
- [Tools] Fazekas scale
- [Tools] PI-RADS
- [Tools] Liver Lab

## Maybe

- Rename LanguageSelector to LocaleSelector, and so on
