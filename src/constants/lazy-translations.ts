import { msg } from "@lingui/core/macro"

export const CATEGORIES = {
  group: {
    examination: msg`Examination`,
    organs: msg`Organs`,
    specialties: msg`Specialties`,
  },

  // Modalities
  angiography: msg`Angiography`,
  ct: msg`CT`,
  fluoroscopy: msg`Fluoroscopy`,
  mri: msg`MRI`,
  us: msg`Ultrasound`,
  xray: msg`X-Ray`,

  // Organs
  adrenal: msg`Adrenal`,
  arteries: msg`Arteries`,
  brain: msg`Brain`,
  heart: msg`Heart`,
  kidney: msg`Kidney`,
  liver: msg`Liver`,
  lowerExtremity: msg`Lower Extremity`,
  lung: msg`Lung`,
  pancreas: msg`Pancreas`,
  prostate: msg`Prostate`,
  spleen: msg`Spleen`,
  upperExtremity: msg`Upper Extremity`,
  veins: msg`Veins`,

  // Specialties
  internalMedicine: msg`Internal Medicine`,
  radiology: msg`Radiology`,
  surgery: msg`Surgery`,
}

export const ERROR_MESSAGES = {
  invalidSlug: msg`Invalid slug. Only letters, numbers, dashes and underscores are allowed ("- _ a-z A-Z 0-9").`,
}

export const LANGUAGES = {
  de: msg`German`,
  en: msg`English`,
  es: msg`Spanish`,
  fr: msg`French`,
  it: msg`Italian`,
  nl: msg`Dutch`,
  pt: msg`Portuguese`,
  sv: msg`Swedish`,
}

export const RELEASE_STATUS = {
  DRAFT: msg`Draft`,
  PUBLISHED: msg`Published`,
  DEPRECATED: msg`Deprecated`,
}

export const VISIBILITY = {
  PUBLIC: msg`Public`,
  INSTITUTE: msg`Institute`,
  PRIVATE: msg`Private`,
}
