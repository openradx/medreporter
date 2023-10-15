export default {
  Gfr: {
    /**
     * Structure
     */
    toolTitle: "GFR Rechner",
    toolHint:
      "Berechnung der GFR für Erwachsene (CKD-EPI, Mayo, Cockcroft-Gault)  und Kinder (Schwartz (orig./rev.), Counahan-Barret).\n",
    inputLabelAge: "Alter",
    inputLabelCreatinine: "Serumkreatinin in mg/dl",
    inputLabelWeight: "Gewicht in kg",
    inputLabelHeight: "Größe in cm",
    inputLabelGender: "Geschlecht",
    optionGenderMale: "Männlich",
    optionGenderFemale: "Weiblich",
    inputLabelEthnicity: "Herkunft",
    optionEthnicityAfricanAmerican: "Afroamerikanisch",
    optionEthnicityOthers: "Andere",

    /**
     * Report
     */
    textCkdRequired: "Kreatinin, Alter, Geschlecht und Herkunft werden zur Berechnung benötigt.",
    textCockcroftRequired:
      "Kreatinin, Alter, Gewicht und Geschlecht werden zur Berechnung benötigt.",
    textMayoRequired: "Kreatinin, Alter und Geschlecht werden zur Berechnung benötigt.",
    textCounahanRequired: "Kreatinin und Größe werden zur Berechnung benötigt.",
    textSchwartzRevRequired: "Kreatinin und Größe werden zur Berechnung benötigt.",
    textSchwartzOrigRequired:
      "Kreatinin, Größe, Alter und Geschlecht werden zur Berechnung benötigt.",
    textAgeMissing:
      "Bitte gib zunächst das Alter des Patienten an um zu definieren, welche Formeln angewandt werden müssen.",
  },
} as const
