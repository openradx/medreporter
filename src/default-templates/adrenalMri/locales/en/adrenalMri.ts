export default {
  AdrenalMri: {
    /**
     * Structure
     */
    toolTitle: "Adrenal gland MRI",
    toolHint: "Characterization of unclear adrenal lesions to detect adenomas by using  MRI.\n",
    groupLabelAdrenal: "Adrenal lesion",
    inputLabelAdrenalInPhase: "Signal In-Phase",
    inputLabelAdrenalOppPhase: "Signal Opposed-Phase",
    groupLabelSpleen: "Spleen",
    inputLabelSpleenInPhase: "Signal In-Phase",
    inputLabelSpleenOppPhase: "Signal Opposed-Phase",
    hintLimitations:
      "Cave: The informative value of the MRI signal intensity measurements is less than the  washout measurements in the CT for lesions with native ≥20 HU and clearly limited for lesions  with native ≥30 HU.\n",
    hintTesla:
      "Cave: The limit value of the signal drop of 16.5% was determined at 1.5 Tesla. At 3 Tesla,  the limit may be lower.\n",
    references: "References",

    /**
     * Report
     */
    textSignalDropoutRequirements:
      "The calculation of the signal drop requires the signal values ​​of the adrenal lesion in  in- and opposed-phase.\n",
    textSignalDropoutWithValue:
      "Signal drop of the lesion between in-phase and opposed-phase: {{value}} %",
    textAdrenalToSpleenRatioRequirements:
      "The calculation of the lesion to spleen ratio requires the signal values ​​of the adrenal lesion  and the spleen in in- and opposed-phase.\n",
    textAdrenalToSpleenRatioWithValue: "Ratio of signal drop of the lesion to spleen: {{value}}",
    missingValues: "Missing values.",
    csiAdenoma:
      "The signal drop is greater than 16.5%, the lesion is classified as a lipid-rich adenoma.",
    csiUnclear:
      "The signal drop is less than or equal to 16.5%, the lesion is classified as unclear.",
    toSpleenAdenoma:
      "The ratio of the signal drop of the lesion to spleen is less than 0.71, the lesion is classified  as a lipid-rich adenoma.\n",
    toSpleenUnclear:
      "The ratio of the lesion to spleen ratio is greater than or equal to 0.71, the lesion is classified  as unclear.\n",
  },
} as const
