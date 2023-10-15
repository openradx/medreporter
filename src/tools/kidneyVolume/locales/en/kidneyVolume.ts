export default {
  KidneyVolume: {
    /**
     * Structure
     */
    toolTitle: "Kidney Volume (Mayo-Model)",
    toolHint:
      "Calculation of the kidney volume for patients with ADPKD (with or without correction against height).\n",
    right: "Right kidney",
    left: "Left kidney",
    coronal: "Coronal length (cm)",
    sagittal: "Sagittal length (cm)",
    width: "Width (cm)",
    depth: "Depth (cm)",
    patient: "Patient",
    patientHeight: "Height (m)",
    patientAge: "Age (years)",

    /**
     * Report
     */
    required: "Missing inputs.",
    resultRight: "Volume right kidney: ",
    resultLeft: "Volume left kidney: ",
    resultTotal: "Total kidney volume: ",
    resultTotalHeightCorrected: "Total kidney volume with correction against height: ",
    wrongAge: "The patient must be between 15 and 80, otherwise this equation can't be applied.",
    value: "{{value}} ml",
  },
} as const
