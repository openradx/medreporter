export default {
  Fleischner2017: {
    /**
     * Structure
     */
    toolTitle: "Fleischner 2017",
    toolHint:
      "Follow-up and management recommendations for indeterminate pulmonary nodules detected incidentally on CT published by the Fleischner Society.\n",
    groupDiameter: "Diameter (mm)",
    inputLabelLongaxis: "Long axis diameter",
    inputLabelShortaxis: "Short axis diameter",
    inputLabelStructure: "Structure",
    optionStructureSolid: "Solid",
    optionStructurePartsolid: "Partsolid",
    optionStructureGroundglass: "Groundglass",
    inputLabelCount: "Count",
    optionCountSingle: "Single",
    optionCountMultiple: "Multiple",
    inputLabelRiskFactors: "Risk factors",
    optionsRiskFactorsYes: "Yes",
    optionsRiskFactorsNo: "No",
    hintApplicability:
      "The guideline does not apply to lung cancer screening (see LungRads instead), patients younger than 35 years, or patients with a history of primary cancer or immunosuppression.\n",

    /**
     * Report
     */
    noSuggestionPossible: "No suggestion possible",
    suggestionOptionalAt12MonthsSuspicious:
      "optional CT at 12 months (particularly with suspicious nodule morphology and/or upper lobe location)",
    suggestionNoFollowUp: "no routine follow-up required",
    suggestionCt6To12MonthsAnd18To24: "CT at 6-12 months, then CT at 18-24 months",
    suggestionCt6to12MonthsAndConsider18To24: "CT at 6-12 months, then consider CT at 18-24 months",
    suggestionCt3MonthsPETSampling: "consider CT at 3 months, PET/CT, or tissue sampling",
    suggestionOptionalAt12Months: "optional CT at 12 months",
    suggestionCt3To6MonthsAnd18To24: "CT at 3-6 months, then CT at 18-24 months",
    suggestionCt3To6MonthsAndConsider18To24: "CT at 3-6 months, then consider CT at 18-24 months",
    suggestionCt6To12Months2Years5Years:
      "CT at 6-12 months, then if persistent, CT every 2 years until 5 years",
    suggestionCt3To6MonthsAnnual:
      "CT at 3-6 months, then if persistent and solid component remains <6 mm, annual CT until 5 years",
    suggestionCt3To6Months2And4Years:
      "CT at 3-6 months, then if stable consider CT at 2 and 4 years in high-risk patients",
    suggestionCt3To6MonthsMostSuspicious:
      "CT at 3-6 months, then subsequent management based on the most suspicious nodule(s)",
    textRecommendation: "Recommendation",
  },
} as const
