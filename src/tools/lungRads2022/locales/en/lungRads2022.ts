export default {
  LungRads2022: {
    /**
     * Structure
     */
    toolTitle: "Lung-RADS 2022",
    toolHint:
      "Classification proposed to aid with findings in low-dose CT screening exams for lung cancer and to standarize the Follow-Up. Not suitable for classifiation of incidental noduli, see Fleischner 2017.",

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

    inputLabelFeaturesSolid: "Has the nodule any of the following features? (for solid nodule)",
    optionFeaturesSolidSmoothMargins:
      "Juxtapleural with smooth margins (& oval, lentiform, or triangular shaped)",
    optionFeaturesSolidSubsegmentalAirway: "Subsegmental airway",
    optionFeaturesSolidSegmentalAirway: " Segmental airway, or more proximal",
    optionFeaturesSolidNone: "None of the above.",

    groupLabelDiameter: "Diameter (mm)",
    inputLabelLongaxis: "Long axis diameter",
    inputLabelShortaxis: "Short axis diameter",

    groupLabelDiameterSolid: "Diameter (mm) of the solid component (for partsolid nodule)",
    inputLabelSolidLongaxis: "Long axis diameter of the solid component",
    inputLabelSolidShortaxis: "Short axis diameter of the solid component",

    inputLabelGrowing: "Is the nodule growing?",
    optionGrowingNew: "New nodule",
    optionGrowingStable: "Stable",
    optionGrowingSlowlyGrowing:
      "Slowly growing over multiple (>1) scans (not growing >1.5mm within 12-month)",
    optionGrowingGrowing: "Growing (> 1.5 mm within 12-month)",
    optionGrowingDecreasing: "Decreasing",

    inputLabelFindingCyst: "Cyst",

    hintCyst:
      "Multiple cysts may indicate an alternative diagnosis such as Langerhans cell histiocytosis (LCH) or lymphangioleiomyomatosis (LAM) and are not classified in Lung-RADS unless other concerning features are identified.",

    inputLabelWall: "Wall of cyst",
    optionWallThin: "Thin (uniform thickness of <2mm",
    optionWallThick: "Thick (>2mm - symmetric, assymmetric or nodular)",

    inputLabelFormation: "Formation of cyst",
    optionFormationUnilocular: "Unilocular",
    optionFormationMultilocular: "Multilocular",

    inputLabelGrowingUnilocular: "Dynamic (unilocular, thick wall",
    optionGrowingUnilocularStable: "Stable",
    optionGrowingUnilocularCystGrowing: "Cystic component is growing",
    optionGrowingUnilocularWallGrowing: "Wall thickness/nodularity is growing",

    inputLabelGrowingMultilocular: "Dynamic (multilocular)",
    optionGrowingMultilocularStable: "Stable",
    optionGrowingMultilocularCystGrowing: "Cystic component is growing",
    optionGrowingMultilocularNewlyMultilocular: "Multilocular cyst was unilocular before",
    optionGrowingMultilocularIncreasedSolid: "Increased/new opacity or increased loculation",

    inputLabelSuspicious: "Other findings suspicious of lung cancer",
    optionSuspiciousSpiculation: "Spiculation",
    optionSuspiciousLymphadenopathy: "Lymphadenopathy",
    optionSuspiciousMetastasis: "Frank metastatic disease",
    optionSuspiciousOther: "Other (add comment)",

    inputLabelSuspiciousOther: "Suspicious finding (other)",

    inputLabelIncidentalFindings:
      "Significant incidental finding (unrelated to lung cancer, adds S-Modifier)",
  },
}
