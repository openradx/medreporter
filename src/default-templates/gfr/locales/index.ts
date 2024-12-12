import { MicroI18n } from "~/utils/microI18n"
import de from "./de/gfr"
import en from "./en/gfr"

const resources = { de, en }
export const i18nStructure = new MicroI18n(resources)
export const i18nReport = new MicroI18n(resources)
