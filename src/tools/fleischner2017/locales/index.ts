import { MicroI18n } from "~/utils/microI18n"
import de from "./de/fleischner2017"
import en from "./en/fleischner2017"

const resources = { de, en }
export const i18nStructure = new MicroI18n(resources)
export const i18nReport = new MicroI18n(resources)
