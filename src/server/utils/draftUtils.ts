import { createModuleDraft, renderDraft } from "@medreporter/medtl-tools"
import { i18n as I18n } from "i18next"
import figureDraft from "~/images/figure-draft.svg?raw"

export function createFigureDraftSource(i18n: I18n) {
  const { language: lng, t } = i18n

  return renderDraft(figureDraft, {
    lng,
    title: t("Figure.title"),
    description: t("Figure.description"),
    optionTriangle: t("Figure.optionTriangle"),
    optionCircle: t("Figure.optionCircle"),
    optionSquare: t("Figure.optionSquare"),
  })
}

export function createModuleDraftSource(i18n: I18n) {
  const { language: lng, t } = i18n

  return createModuleDraft({
    lng,
    title: t("Module.title"),
    description: t("Module.description"),
    fieldLabel: t("Module.fieldLabel"),
  })
}
