export default {
  LungRads2022: {
    /**
     * Structure
     */
    toolTitle: "Lung-RADS 2022",
    toolHint:
      "Classification proposed to aid with findings in low-dose CT screening exams for lung cancer and to standarize the Follow-Up.",

    inputLabelScan: "Timepoint",
    optionScanBaseline: "Baseline",
    optionScanFollowUp: "Follow-up",

    inputLabelExam: "Do any of these apply to the exam?",
    optionExamPriorCT: "Prior CT exists but is not available",
    optionExamNotEvaluable: "Part or all of lung is not evaluable",
    optionExamInfectious: "Signs of an inflammatory or infectious disease.",
    optionExamNone: "None of the above apply.",

    inputLabelFindingNodule: "Nodule",

    inputLabelBenignFeatures: "Does the nodule have any of the following?",
    optionBenignFeaturesCalcification: "Calcification (e.g. complete, central, popcorn, ring)",
    optionBenignFeaturesFat: "Fat",
    optionBenignFeaturesNone: "None of the above.",

    inputLabelStructure: "Structure",
    optionStructureSolid: "Solid",
    optionStructurePartsolid: "Partsolid",
    optionStructureGroundglass: "Groundglass",

    inputLabelFeaturesSolid: "Has the nodule any of the following features? (Solid Nodule)",
    optionFeaturesSolidSmoothMargins:
      "Juxtapleural with smooth margins (& oval, lentiform, or triangular shaped)",
    optionFeaturesSolidSubsegmentalAirway: "Subsegmental airway",
    optionFeaturesSolidSegmentalAirway: " Segmental airway, or more proximal",
    optionFeaturesSolidNone: "None of the above.",

    groupDiameter: "Diameter (mm)",
    inputLabelLongaxis: "Long axis diameter",
    inputLabelShortaxis: "Short axis diameter",

    groupDiameterSolid: "Diameter (mm) of the solid component",
    inputLabelSolidLongaxis: "Long axis diameter of the solid component",
    inputLabelSolidShortaxis: "Short axis diameter of the solid component",

    inputLabelGrowing: "Is the nodule growing?",
    optionGrowingNew: "New nodule",
    optionGrowingStable: "Stable",
    optionGrowingSlowlyGrowing:
      "Slowly growing over multiple (>1) scans (not growing >1.5mm within 12-month)",
    optionGrowingGrowing: "Growing (> 1.5 mm within 12-month)",
    optionGrowingDecreasing: "Decreasing",
  },
}
