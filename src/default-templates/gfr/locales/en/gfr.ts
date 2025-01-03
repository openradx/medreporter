export default {
  Gfr: {
    /**
     * Structure
     */
    toolTitle: "GFR calculator",
    toolHint:
      "A tool to calculate the GFR for adults (CKD-EPI, Mayo, Cockcroft-Gault)  and children (Schwartz (orig./rev.), Counahan-Barret).\n",
    inputLabelAge: "Age in years",
    inputLabelCreatinine: "Creatinine in mg/dl",
    inputLabelWeight: "Weight in kg",
    inputLabelHeight: "Height in cm",
    inputLabelGender: "Gender",
    optionGenderMale: "Male",
    optionGenderFemale: "Female",
    inputLabelEthnicity: "Ethnicity",
    optionEthnicityAfricanAmerican: "African American",
    optionEthnicityOthers: "Others",

    /**
     * Report
     */
    textCkdRequired: "Creatinine, age, gender and ethnicity are required.",
    textCockcroftRequired: "Creatinine, age, weight and gender are required.",
    textMayoRequired: "Creatinine, age and gender are required.",
    textCounahanRequired: "Creatinine and height are required.",
    textSchwartzRevRequired: "Creatinine and height are required.",
    textSchwartzOrigRequired: "Creatinine, height, age and gender are required.",
    textAgeMissing:
      "Please fill in the age of the patient first to define which equations should be used.",
  },
} as const
