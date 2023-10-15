import { MicroI18n } from "~/utils/microI18n"
import de from "./de/adrenalWashout"
import en from "./en/adrenalWashout"

const resources = { de, en }
export const i18nStructure = new MicroI18n(resources)
export const i18nReport = new MicroI18n(resources)
